const MEAL_FILTERS = [
  { id: "all", label: "全部" },
  { id: "breakfast", label: "早餐" },
  { id: "lunch", label: "午餐" },
  { id: "dinner", label: "晚餐" },
];

const state = {
  dayId: DAYS[0].id,
  weekIndex: 0,
  mealFilter: "all",
  memberFilter: "all",
  query: "",
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function memberById(id) {
  return MEMBERS.find((member) => member.id === id);
}

function memberTip(member, dish) {
  if (dish.memberTips && dish.memberTips[member.id]) {
    return dish.memberTips[member.id];
  }

  if (member.id === 0) {
    return "少盐、不加糖；主食优先低GI并控制份量。";
  }
  if (member.id === 1) {
    return "少盐，避开肥肉、油炸和重酱。";
  }
  if (member.id === 2) {
    return "先吃蔬菜和蛋白，主食减约1/3，细嚼慢咽。";
  }
  return "趁热吃，可加姜；保证优质蛋白，适量温性食材。";
}

function dishMatchesMember(dish) {
  if (state.memberFilter === "all") return true;
  return dish.suitable.includes(Number(state.memberFilter));
}

function dishMatchesQuery(dish) {
  const query = state.query.trim().toLowerCase();
  if (!query) return true;

  const haystack = [
    dish.name,
    dish.sub,
    dish.category,
    dish.desc,
    dish.nutrition,
    dish.tcm,
    dish.contra,
    ...dish.tags,
    ...(dish.ingredients || []).map((item) => item.name),
    ...(dish.seasoning || []).map((item) => item.name),
    ...(dish.steps || []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function formatItems(items) {
  if (!items || items.length === 0) return "无";
  return items.map((item) => `${item.name} ${item.grams}克`).join(" · ");
}

function renderFamily() {
  const root = document.querySelector("#familyGrid");
  root.innerHTML = MEMBERS.map(
    (member) => `
      <article class="member-card" data-member="${member.id}">
        <div class="member-card-head">
          <div class="member-avatar">${esc(member.avatar)}</div>
          <div class="member-meta">
            <strong>${esc(member.name)}</strong>
            <span>${esc(member.meta)}</span>
          </div>
        </div>
        <p class="member-goal">${esc(member.condition)}</p>
        <p class="member-note">${esc(member.goal)}</p>
      </article>
    `,
  ).join("");

  root.querySelectorAll(".member-card").forEach((card) => {
    card.addEventListener("click", () => {
      const memberId = card.dataset.member;
      state.memberFilter =
        state.memberFilter === memberId ? "all" : memberId;
      renderMemberFilter();
      renderMenu();
      document
        .querySelector(".menu-section")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderDayTabs() {
  const root = document.querySelector("#dayTabs");
  const weekDays = DAYS.filter((day) => day.week === state.weekIndex);
  root.innerHTML = weekDays.map(
    (day) => `
      <button class="day-tab ${day.id === state.dayId ? "active" : ""}" data-day="${day.id}">
        <span>${esc(day.label)}</span>
        <strong>${esc(day.date)}</strong>
      </button>
    `,
  ).join("");

  root.querySelectorAll(".day-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.dayId = tab.dataset.day;
      renderDayTabs();
      renderMenu();
    });
  });
}

function renderWeekTabs() {
  const root = document.querySelector("#weekTabs");
  root.innerHTML = WEEKS.map(
    (week) => `
      <button class="week-tab ${week.id === state.weekIndex ? "active" : ""}" data-week="${week.id}">
        ${esc(week.label)} · ${esc(week.range)}
      </button>
    `,
  ).join("");

  root.querySelectorAll(".week-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      state.weekIndex = Number(tab.dataset.week);
      const firstDay = DAYS.find((day) => day.week === state.weekIndex);
      state.dayId = firstDay.id;
      renderWeekTabs();
      renderDayTabs();
      renderMenu();
      renderShopping();
    });
  });
}

function renderMealFilter() {
  const root = document.querySelector("#mealFilter");
  root.innerHTML = MEAL_FILTERS.map(
    (filter) => `
      <button class="segment-button ${filter.id === state.mealFilter ? "active" : ""}" data-meal="${filter.id}">
        ${esc(filter.label)}
      </button>
    `,
  ).join("");

  root.querySelectorAll(".segment-button").forEach((button) => {
    button.addEventListener("click", () => {
      state.mealFilter = button.dataset.meal;
      renderMealFilter();
      renderMenu();
    });
  });
}

function renderMemberFilter() {
  const root = document.querySelector("#memberFilter");
  const buttons = [
    { id: "all", label: "全家" },
    ...MEMBERS.map((member) => ({ id: String(member.id), label: member.name })),
  ];

  root.innerHTML = `
    <span class="filter-label">按家人筛选</span>
    ${buttons
      .map(
        (item) => `
          <button class="member-chip ${state.memberFilter === item.id ? "active" : ""}" data-member-filter="${item.id}">
            ${esc(item.label)}
          </button>
        `,
      )
      .join("")}
  `;

  root.querySelectorAll(".member-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.memberFilter = chip.dataset.memberFilter;
      renderMemberFilter();
      renderMenu();
    });
  });
}

function suitableLabel(dish) {
  if (dish.suitable.length === MEMBERS.length) {
    return "全家适用";
  }
  return dish.suitable.map((id) => memberById(id).name).join(" · ");
}

function dishCardHtml(dish) {
  return `
    <button class="dish-card" type="button" data-dish-id="${esc(dish.id)}" aria-label="查看${esc(dish.name)}详情">
      <div class="dish-top">
        <span class="dish-category">${esc(dish.category)}</span>
        <span class="dish-open" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </span>
      </div>
      <h4>${esc(dish.name)}</h4>
      <p class="dish-sub">${esc(dish.sub)} · ${esc(suitableLabel(dish))}</p>
      <p class="dish-desc">${esc(dish.desc)}</p>
      <div class="dish-tags">
        ${dish.tags.slice(0, 4).map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}
      </div>
    </button>
  `;
}

function renderMenu() {
  const day = DAYS.find((item) => item.id === state.dayId);
  const root = document.querySelector("#dayMenu");

  const meals = day.meals.filter((meal) => {
    return state.mealFilter === "all" || meal.id === state.mealFilter;
  });

  const visibleMeals = meals
    .map((meal) => ({
      ...meal,
      dishes: meal.dishes.filter((dish) => dishMatchesMember(dish) && dishMatchesQuery(dish)),
    }))
    .filter((meal) => meal.dishes.length > 0);

  const summary = `
    <div class="day-summary">
      <div>
        <h3>${esc(day.label)} · ${esc(day.date)}</h3>
        <p>${esc(day.summary)}</p>
      </div>
    </div>
  `;

  if (visibleMeals.length === 0) {
    root.innerHTML = `
      ${summary}
      <div class="empty-state">没有找到匹配的菜。换个家人、餐次或关键词试试。</div>
    `;
    return;
  }

  const mealHtml = visibleMeals
    .map(
      (meal) => `
        <div class="meal-block">
          <div class="meal-label">
            ${esc(meal.label)}
            <span>${esc(meal.time)} · ${meal.dishes.length}道</span>
          </div>
          <div class="dish-list">
            ${meal.dishes.map((dish) => dishCardHtml(dish)).join("")}
          </div>
        </div>
      `,
    )
    .join("");

  root.innerHTML = summary + mealHtml;
  bindDishCards(root);
}

function bindDishCards(root) {
  root.querySelectorAll("[data-dish-id]").forEach((card) => {
    card.addEventListener("click", () => {
      const day = DAYS.find((item) => item.id === state.dayId);
      const meal = day.meals
        .flatMap((item) => item.dishes)
        .find((dish) => dish.id === card.dataset.dishId);
      if (meal) openDishModal(meal, day);
    });
  });
}

function openDishModal(dish, day) {
  const modal = document.querySelector("#dishModal");
  const content = document.querySelector("#modalContent");

  content.innerHTML = `
    <p class="modal-kicker">${esc(day.label)} · ${esc(dish.category)}</p>
    <h2 id="modalDishName">${esc(dish.name)}</h2>
    <p class="modal-sub">${esc(dish.sub)} · ${esc(suitableLabel(dish))}</p>
    <p class="modal-desc">${esc(dish.desc)}</p>
    <div class="modal-tags">
      ${dish.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}
    </div>
    <div class="modal-section">
      <h3>食材用量</h3>
      <p>${esc(formatItems(dish.ingredients))}</p>
    </div>
    <div class="modal-section">
      <h3>调料用量</h3>
      <p>${esc(formatItems(dish.seasoning))}</p>
    </div>
    <div class="modal-section">
      <h3>制作流程</h3>
      <div class="steps-list">
        ${dish.steps.map((step, index) => `<p><span>${index + 1}</span>${esc(step)}</p>`).join("")}
      </div>
    </div>
    <div class="modal-section">
      <h3>现代营养作用</h3>
      <p>${esc(dish.nutrition)}</p>
    </div>
    <div class="modal-section">
      <h3>药食同源中医作用</h3>
      <p>${esc(dish.tcm)}</p>
    </div>
    <div class="modal-section">
      <h3>禁忌与注意</h3>
      <p>${esc(dish.contra)}</p>
    </div>
    <div class="modal-section">
      <h3>四人分餐建议</h3>
      <div class="member-advice-grid">
        ${MEMBERS.map(
          (member) => `
            <div class="advice-item">
              <strong>${esc(member.name)}</strong>
              <p>${esc(memberTip(member, dish))}</p>
            </div>
          `,
        ).join("")}
      </div>
    </div>
  `;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeDishModal() {
  const modal = document.querySelector("#dishModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderHerbs() {
  const root = document.querySelector("#herbGrid");
  root.innerHTML = HERBS.map(
    (herb) => `
      <article class="herb-card">
        <h3>${esc(herb.name)}</h3>
        <p>${esc(herb.use)}</p>
        <p class="herb-warning">${esc(herb.avoid)}</p>
      </article>
    `,
  ).join("");
}

function renderShopping() {
  const root = document.querySelector("#shoppingList");
  const currentWeek = SHOPPING_BY_WEEK[state.weekIndex] || [];
  const categories = [
    ...new Set(
      [...currentWeek, ...SHOPPING_MONTH].map((item) => item.title),
    ),
  ];

  root.innerHTML = categories
    .map((title) => {
      const weekGroup = currentWeek.find((item) => item.title === title);
      const monthGroup = SHOPPING_MONTH.find((item) => item.title === title);
      return `
        <div class="shopping-column">
          <h4>${esc(title)}</h4>
          <p>第${state.weekIndex + 1}周</p>
          <div class="shopping-amounts">${(weekGroup ? weekGroup.items : []).map((item) => `<span>${esc(item.name)} ${item.grams}克</span>`).join("")}</div>
          <p>整月</p>
          <div class="shopping-amounts">${(monthGroup ? monthGroup.items : []).map((item) => `<span>${esc(item.name)} ${item.grams}克</span>`).join("")}</div>
        </div>
      `;
    })
    .join("");
}

function bindGlobalEvents() {
  const searchInput = document.querySelector("#searchInput");
  searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderMenu();
  });

  document.querySelector("#printButton").addEventListener("click", () => {
    window.print();
  });

  document.querySelector("#scrollTopButton").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelector("#modalClose").addEventListener("click", closeDishModal);
  document.querySelector("#dishModal").addEventListener("click", (event) => {
    if (event.target === event.currentTarget) closeDishModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDishModal();
  });
}

function init() {
  renderFamily();
  renderWeekTabs();
  renderDayTabs();
  renderMealFilter();
  renderMemberFilter();
  renderMenu();
  renderHerbs();
  renderShopping();
  bindGlobalEvents();
}

document.addEventListener("DOMContentLoaded", init);
