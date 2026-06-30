const CATEGORIES = {
  carro_luxo: {
    label: "Carro de luxo",
    shortLabel: "Carro",
    averageTicket: 1000000,
    currentSales: 10,
    bmfSales: 2,
    specialistMargin: 12,
    commission: 5,
  },
  barco: {
    label: "Barco",
    shortLabel: "Barco",
    averageTicket: 2000000,
    currentSales: 5,
    bmfSales: 1,
    specialistMargin: 15,
    commission: 3,
  },
  aeronave: {
    label: "Aeronave",
    shortLabel: "Aeronave",
    averageTicket: 10000000,
    currentSales: 1,
    bmfSales: 1,
    specialistMargin: 4,
    commission: 1,
  },
};

const DEFAULT_TAX_RATE = 9.65;
const DEFAULT_PLATFORM_SPLIT = 50;
const DEFAULT_CONSULTANT_SPLIT = 50;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const ratioFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 1,
  minimumFractionDigits: 0,
});

let activeEditCategory = "carro_luxo";
let activeResultCategory = "carro_luxo";
let syncingSplit = false;
let categoryState = createDefaultState();

const elements = {
  form: document.querySelector("#calculatorForm"),
  editTabs: document.querySelectorAll("[data-edit-category]"),
  resultTabs: document.querySelectorAll("[data-result-category]"),
  averageTicket: document.querySelector("#averageTicket"),
  currentSales: document.querySelector("#currentSales"),
  bmfSales: document.querySelector("#bmfSales"),
  specialistMargin: document.querySelector("#specialistMargin"),
  totalCommission: document.querySelector("#totalCommission"),
  platformSplit: document.querySelector("#platformSplit"),
  consultantSplit: document.querySelector("#consultantSplit"),
  taxRate: document.querySelector("#taxRate"),
  variableCosts: document.querySelector("#variableCosts"),
  fixedCosts: document.querySelector("#fixedCosts"),
  resetDefaults: document.querySelector("#resetDefaults"),
  validationAlert: document.querySelector("#validationAlert"),
  openParameters: document.querySelector("#openParameters"),
  openParametersTop: document.querySelector("#openParametersTop"),
  closeParameters: document.querySelector("#closeParameters"),
  sidebarBackdrop: document.querySelector("#sidebarBackdrop"),
  categoryResult: document.querySelector("#categoryResult"),
  averageTicketResult: document.querySelector("#averageTicketResult"),
  currentSalesResult: document.querySelector("#currentSalesResult"),
  bmfSalesResult: document.querySelector("#bmfSalesResult"),
  /* Nova visão do especialista: Antes/Depois + Crescimento + ROI */
  comparisonCurrentProfit: document.querySelector("#comparisonCurrentProfit"),
  comparisonCurrentSales: document.querySelector("#comparisonCurrentSales"),
  comparisonCurrentMargin: document.querySelector("#comparisonCurrentMargin"),
  comparisonTotalProfit: document.querySelector("#comparisonTotalProfit"),
  comparisonTotalSales: document.querySelector("#comparisonTotalSales"),
  comparisonNetMargin: document.querySelector("#comparisonNetMargin"),
  growthAmount: document.querySelector("#growthAmount"),
  growthText: document.querySelector("#growthText"),
  specialistRoi: document.querySelector("#specialistRoi"),
  specialistRoiText: document.querySelector("#specialistRoiText"),
  specialistCommission: document.querySelector("#specialistCommission"),
  specialistCommissionText: document.querySelector("#specialistCommissionText"),
  consultantRevenue: document.querySelector("#consultantRevenue"),
  consultantOpportunities: document.querySelector("#consultantOpportunities"),
  consultantTakeRate: document.querySelector("#consultantTakeRate"),
  commissionPaid: document.querySelector("#commissionPaid"),
  commissionPaidDetail: document.querySelector("#commissionPaidDetail"),
  consultantRevenueDistribution: document.querySelector("#consultantRevenueDistribution"),
  platformRevenue: document.querySelector("#platformRevenue"),
  currentRevenue: document.querySelector("#currentRevenue"),
  specialistCurrentProfit: document.querySelector("#specialistCurrentProfit"),
  incrementalGmv: document.querySelector("#incrementalGmv"),
  specialistIncrementalGrossProfit: document.querySelector("#specialistIncrementalGrossProfit"),
  specialistIncrementalNetProfitDetail: document.querySelector("#specialistIncrementalNetProfitDetail"),
  totalCommissionRate: document.querySelector("#totalCommissionRate"),
  platformTakeRate: document.querySelector("#platformTakeRate"),
  taxValue: document.querySelector("#taxValue"),
  totalCosts: document.querySelector("#totalCosts"),
  platformFinalResult: document.querySelector("#platformFinalResult"),
  /* Visão consolidada */
  specialistViews: document.querySelectorAll(".specialist-view"),
  consolidatedViews: document.querySelectorAll(".consolidated-view"),
  consolidatedCurrentProfit: document.querySelector("#consolidatedCurrentProfit"),
  consolidatedCurrentSales: document.querySelector("#consolidatedCurrentSales"),
  consolidatedCurrentMargin: document.querySelector("#consolidatedCurrentMargin"),
  consolidatedTotalProfit: document.querySelector("#consolidatedTotalProfit"),
  consolidatedTotalSales: document.querySelector("#consolidatedTotalSales"),
  consolidatedNetMargin: document.querySelector("#consolidatedNetMargin"),
  consolidatedGrowth: document.querySelector("#consolidatedGrowth"),
  consolidatedGrowthText: document.querySelector("#consolidatedGrowthText"),
  consolidatedCommission: document.querySelector("#consolidatedCommission"),
  consolidatedConsultantRevenue: document.querySelector("#consolidatedConsultantRevenue"),
  consolidatedPlatformResult: document.querySelector("#consolidatedPlatformResult"),
  /* Breakdown */
  breakdownCarGmv: document.querySelector("#breakdownCarGmv"),
  breakdownCarNetProfit: document.querySelector("#breakdownCarNetProfit"),
  breakdownCarCommission: document.querySelector("#breakdownCarCommission"),
  breakdownCarPlatform: document.querySelector("#breakdownCarPlatform"),
  breakdownBoatGmv: document.querySelector("#breakdownBoatGmv"),
  breakdownBoatNetProfit: document.querySelector("#breakdownBoatNetProfit"),
  breakdownBoatCommission: document.querySelector("#breakdownBoatCommission"),
  breakdownBoatPlatform: document.querySelector("#breakdownBoatPlatform"),
  breakdownAircraftGmv: document.querySelector("#breakdownAircraftGmv"),
  breakdownAircraftNetProfit: document.querySelector("#breakdownAircraftNetProfit"),
  breakdownAircraftCommission: document.querySelector("#breakdownAircraftCommission"),
  breakdownAircraftPlatform: document.querySelector("#breakdownAircraftPlatform"),
};

function createDefaultState() {
  return Object.fromEntries(
    Object.entries(CATEGORIES).map(([key, category]) => [
      key,
      {
        averageTicket: category.averageTicket,
        currentSales: category.currentSales,
        bmfSales: category.bmfSales,
        specialistMargin: category.specialistMargin,
        totalCommission: category.commission,
        platformSplit: DEFAULT_PLATFORM_SPLIT,
        consultantSplit: DEFAULT_CONSULTANT_SPLIT,
        taxRate: DEFAULT_TAX_RATE,
        variableCosts: 0,
        fixedCosts: 0,
      },
    ]),
  );
}

function parseFormattedNumber(value) {
  const normalized = String(value)
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  return Number.parseFloat(normalized) || 0;
}

function parseDecimalNumber(value) {
  const normalized = String(value)
    .replace(/\s/g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");

  return Number.parseFloat(normalized) || 0;
}

function formatCurrency(value) {
  return currencyFormatter.format(Math.round(value));
}

function formatSignedCurrency(value) {
  const rounded = Math.round(value);
  const formatted = formatCurrency(Math.abs(rounded));

  if (rounded > 0) {
    return `+${formatted}`;
  }

  if (rounded < 0) {
    return `-${formatted}`;
  }

  return formatted;
}

function formatPercent(value) {
  return `${percentFormatter.format(value)}%`;
}

function formatRatio(value) {
  return `${ratioFormatter.format(value)}x`;
}

function formatIntegerInput(input) {
  const isNegative = String(input.value).trim().startsWith("-");
  const digits = String(input.value).replace(/\D/g, "");

  if (!digits) {
    input.value = isNegative ? "-" : "";
    return;
  }

  input.value = `${isNegative ? "-" : ""}${integerFormatter.format(Number(digits))}`;
}

function setPercentInput(input, value) {
  const rounded = Math.round(value * 100) / 100;
  input.value = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
}

function clampPercent(value) {
  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return value;
}

function readFormIntoActiveCategory() {
  categoryState[activeEditCategory] = {
    averageTicket: parseFormattedNumber(elements.averageTicket.value),
    currentSales: Math.floor(parseFormattedNumber(elements.currentSales.value)),
    bmfSales: Math.floor(parseFormattedNumber(elements.bmfSales.value)),
    specialistMargin: parseDecimalNumber(elements.specialistMargin.value),
    totalCommission: parseDecimalNumber(elements.totalCommission.value),
    platformSplit: parseDecimalNumber(elements.platformSplit.value),
    consultantSplit: parseDecimalNumber(elements.consultantSplit.value),
    taxRate: parseDecimalNumber(elements.taxRate.value),
    variableCosts: parseFormattedNumber(elements.variableCosts.value),
    fixedCosts: parseFormattedNumber(elements.fixedCosts.value),
  };
}

function loadCategoryIntoForm(categoryKey) {
  const state = categoryState[categoryKey];

  elements.averageTicket.value = integerFormatter.format(state.averageTicket);
  elements.currentSales.value = state.currentSales;
  elements.bmfSales.value = state.bmfSales;
  setPercentInput(elements.specialistMargin, state.specialistMargin);
  setPercentInput(elements.totalCommission, state.totalCommission);
  setPercentInput(elements.platformSplit, state.platformSplit);
  setPercentInput(elements.consultantSplit, state.consultantSplit);
  setPercentInput(elements.taxRate, state.taxRate);
  elements.variableCosts.value = integerFormatter.format(state.variableCosts);
  elements.fixedCosts.value = integerFormatter.format(state.fixedCosts);
}

function validateCategoryState(state) {
  const errors = [];

  Object.entries(state).forEach(([categoryKey, values]) => {
    const label = CATEGORIES[categoryKey].label;

    if (values.averageTicket < 0) {
      errors.push(`${label}: o ticket médio não pode ser negativo.`);
    }

    if (values.currentSales < 0 || values.bmfSales < 0) {
      errors.push(`${label}: volumes de vendas não podem ser negativos.`);
    }

    if (
      values.totalCommission < 0 ||
      values.specialistMargin < 0 ||
      values.platformSplit < 0 ||
      values.consultantSplit < 0 ||
      values.taxRate < 0
    ) {
      errors.push(`${label}: percentuais não podem ser negativos.`);
    }

    if (values.platformSplit > 100 || values.consultantSplit > 100) {
      errors.push(`${label}: o split da comissão deve ficar entre 0% e 100%.`);
    }

    if (values.variableCosts < 0 || values.fixedCosts < 0) {
      errors.push(`${label}: custos não podem ser negativos.`);
    }
  });

  return errors;
}

function calculateCategory(values) {
  const currentRevenue = values.averageTicket * values.currentSales;
  const specialistCurrentProfit = currentRevenue * (values.specialistMargin / 100);
  const incrementalGmv = values.averageTicket * values.bmfSales;
  const specialistIncrementalGrossProfit = incrementalGmv * (values.specialistMargin / 100);
  const commissionPaid = incrementalGmv * (values.totalCommission / 100);
  const specialistIncrementalNetProfit = specialistIncrementalGrossProfit - commissionPaid;
  const specialistTotalProfitWithBmf = specialistCurrentProfit + specialistIncrementalNetProfit;
  const platformRevenue = commissionPaid * (values.platformSplit / 100);
  const consultantRevenue = commissionPaid * (values.consultantSplit / 100);
  const taxValue = platformRevenue * (values.taxRate / 100);
  const totalCosts = values.variableCosts + values.fixedCosts;
  const platformFinalResult = platformRevenue - taxValue - totalCosts;
  const platformTakeRate = incrementalGmv > 0 ? (platformRevenue / incrementalGmv) * 100 : 0;
  const consultantTakeRate = incrementalGmv > 0 ? (consultantRevenue / incrementalGmv) * 100 : 0;
  const efficiencyRatio = commissionPaid > 0 ? incrementalGmv / commissionPaid : 0;
  const profitRoi = commissionPaid > 0 ? specialistIncrementalNetProfit / commissionPaid : 0;
  const growthPercent = specialistCurrentProfit > 0 ? (specialistIncrementalNetProfit / specialistCurrentProfit) * 100 : 0;
  const specialistNetIncrementalMargin = values.specialistMargin - values.totalCommission;

  return {
    ...values,
    currentRevenue,
    specialistCurrentProfit,
    incrementalGmv,
    specialistIncrementalGrossProfit,
    commissionPaid,
    specialistIncrementalNetProfit,
    specialistTotalProfitWithBmf,
    platformRevenue,
    consultantRevenue,
    taxValue,
    totalCosts,
    platformFinalResult,
    totalCommissionRate: values.totalCommission,
    platformTakeRate,
    consultantTakeRate,
    efficiencyRatio,
    profitRoi,
    growthPercent,
    specialistNetIncrementalMargin,
  };
}

function calculateConsolidated(resultsByCategory) {
  const results = Object.values(resultsByCategory);
  const sum = (key) => results.reduce((total, result) => total + result[key], 0);
  const incrementalGmv = sum("incrementalGmv");
  const commissionPaid = sum("commissionPaid");
  const platformRevenue = sum("platformRevenue");
  const consultantRevenue = sum("consultantRevenue");
  const taxValue = sum("taxValue");
  const totalCosts = sum("totalCosts");
  const currentSales = sum("currentSales");
  const bmfSales = sum("bmfSales");

  return {
    averageTicket: (sum("currentRevenue") + incrementalGmv) / Math.max(1, currentSales + bmfSales),
    currentSales,
    bmfSales,
    currentRevenue: sum("currentRevenue"),
    specialistCurrentProfit: sum("specialistCurrentProfit"),
    incrementalGmv,
    specialistIncrementalGrossProfit: sum("specialistIncrementalGrossProfit"),
    commissionPaid,
    specialistIncrementalNetProfit: sum("specialistIncrementalNetProfit"),
    specialistTotalProfitWithBmf: sum("specialistTotalProfitWithBmf"),
    platformRevenue,
    consultantRevenue,
    taxValue,
    totalCosts,
    platformFinalResult: platformRevenue - taxValue - totalCosts,
    totalCommissionRate: incrementalGmv > 0 ? (commissionPaid / incrementalGmv) * 100 : 0,
    specialistMargin: incrementalGmv > 0 ? (sum("specialistIncrementalGrossProfit") / incrementalGmv) * 100 : 0,
    specialistNetIncrementalMargin: incrementalGmv > 0 ? (sum("specialistIncrementalNetProfit") / incrementalGmv) * 100 : 0,
    platformTakeRate: incrementalGmv > 0 ? (platformRevenue / incrementalGmv) * 100 : 0,
    consultantTakeRate: incrementalGmv > 0 ? (consultantRevenue / incrementalGmv) * 100 : 0,
    taxRate: platformRevenue > 0 ? (taxValue / platformRevenue) * 100 : 0,
    platformSplit: commissionPaid > 0 ? (platformRevenue / commissionPaid) * 100 : 50,
    consultantSplit: commissionPaid > 0 ? (consultantRevenue / commissionPaid) * 100 : 50,
    efficiencyRatio: commissionPaid > 0 ? incrementalGmv / commissionPaid : 0,
    profitRoi: commissionPaid > 0 ? sum("specialistIncrementalNetProfit") / commissionPaid : 0,
    growthPercent: sum("specialistCurrentProfit") > 0 ? (sum("specialistIncrementalNetProfit") / sum("specialistCurrentProfit")) * 100 : 0,
  };
}

function setAlert(message) {
  elements.validationAlert.hidden = false;
  elements.validationAlert.textContent = message;
}

function clearAlert() {
  elements.validationAlert.hidden = true;
  elements.validationAlert.textContent = "";
}

function renderEmptyState() {
  [
    elements.categoryResult,
    elements.averageTicketResult,
    elements.currentSalesResult,
    elements.bmfSalesResult,
    elements.comparisonCurrentProfit,
    elements.comparisonTotalProfit,
    elements.growthAmount,
    elements.specialistRoi,
    elements.specialistCommission,
    elements.consultantRevenue,
    elements.consultantOpportunities,
    elements.consultantTakeRate,
    elements.commissionPaid,
    elements.commissionPaidDetail,
    elements.consultantRevenueDistribution,
    elements.platformRevenue,
    elements.currentRevenue,
    elements.specialistCurrentProfit,
    elements.incrementalGmv,
    elements.specialistIncrementalGrossProfit,
    elements.specialistIncrementalNetProfitDetail,
    elements.totalCommissionRate,
    elements.platformTakeRate,
    elements.taxValue,
    elements.totalCosts,
    elements.platformFinalResult,
  ].forEach((element) => {
    element.textContent = "Não calculado";
  });

  elements.specialistRoiText.textContent = "A cada R$ 1 em comissão, R$ 0 em lucro novo.";
  elements.specialistCommissionText.textContent = "Apenas sobre as vendas que a BMF trouxer.";
  elements.growthText.textContent = "de lucro adicional por mês";
  elements.comparisonCurrentSales.textContent = "0 vendas";
  elements.comparisonCurrentMargin.textContent = "margem 0%";
  elements.comparisonTotalSales.textContent = "0 vendas";
  elements.comparisonNetMargin.textContent = "margem líquida 0%";

  /* Consolidated empty state */
  if (elements.consolidatedCurrentProfit) {
    elements.consolidatedCurrentSales.textContent = "0 vendas";
    elements.consolidatedCurrentMargin.textContent = "margem média 0%";
    elements.consolidatedTotalSales.textContent = "0 vendas";
    elements.consolidatedNetMargin.textContent = "margem líquida 0%";
    elements.consolidatedGrowthText.textContent = "de lucro adicional em 3 categorias";
  }
}

function toggleViewMode(isConsolidated) {
  elements.specialistViews.forEach((el) => {
    el.hidden = isConsolidated;
  });
  elements.consolidatedViews.forEach((el) => {
    el.hidden = !isConsolidated;
  });
}

function renderConsolidatedView(resultsByCategory, consolidated) {
  /* Antes/Depois consolidado */
  elements.consolidatedCurrentProfit.textContent = formatCurrency(consolidated.specialistCurrentProfit);
  elements.consolidatedCurrentSales.textContent = `${integerFormatter.format(consolidated.currentSales)} vendas`;
  elements.consolidatedCurrentMargin.textContent = `margem média ${formatPercent(consolidated.specialistMargin)}`;

  elements.consolidatedTotalProfit.textContent = formatCurrency(consolidated.specialistTotalProfitWithBmf);
  elements.consolidatedTotalSales.textContent = `${integerFormatter.format(consolidated.currentSales + consolidated.bmfSales)} vendas`;
  elements.consolidatedNetMargin.textContent = `margem líquida ${formatPercent(consolidated.specialistNetIncrementalMargin)}`;

  /* Banner de crescimento */
  elements.consolidatedGrowth.textContent = formatSignedCurrency(consolidated.specialistIncrementalNetProfit);
  elements.consolidatedGrowthText.textContent = `de lucro adicional com ${integerFormatter.format(consolidated.bmfSales)} novas vendas em 3 categorias`;

  /* Visão geral */
  elements.consolidatedCommission.textContent = formatCurrency(consolidated.commissionPaid);
  elements.consolidatedConsultantRevenue.textContent = formatSignedCurrency(consolidated.consultantRevenue);
  elements.consolidatedPlatformResult.textContent = formatCurrency(consolidated.platformFinalResult);

  /* Breakdown por categoria */
  const car = resultsByCategory.carro_luxo;
  const boat = resultsByCategory.barco;
  const aircraft = resultsByCategory.aeronave;

  elements.breakdownCarGmv.textContent = formatCurrency(car.incrementalGmv);
  elements.breakdownCarNetProfit.textContent = formatSignedCurrency(car.specialistIncrementalNetProfit);
  elements.breakdownCarCommission.textContent = formatCurrency(car.commissionPaid);
  elements.breakdownCarPlatform.textContent = formatCurrency(car.platformRevenue);

  elements.breakdownBoatGmv.textContent = formatCurrency(boat.incrementalGmv);
  elements.breakdownBoatNetProfit.textContent = formatSignedCurrency(boat.specialistIncrementalNetProfit);
  elements.breakdownBoatCommission.textContent = formatCurrency(boat.commissionPaid);
  elements.breakdownBoatPlatform.textContent = formatCurrency(boat.platformRevenue);

  elements.breakdownAircraftGmv.textContent = formatCurrency(aircraft.incrementalGmv);
  elements.breakdownAircraftNetProfit.textContent = formatSignedCurrency(aircraft.specialistIncrementalNetProfit);
  elements.breakdownAircraftCommission.textContent = formatCurrency(aircraft.commissionPaid);
  elements.breakdownAircraftPlatform.textContent = formatCurrency(aircraft.platformRevenue);
}

function renderTabs() {
  elements.editTabs.forEach((tab) => {
    const isActive = tab.dataset.editCategory === activeEditCategory;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  elements.resultTabs.forEach((tab) => {
    const isActive = tab.dataset.resultCategory === activeResultCategory;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function renderResults(result, label) {
  elements.categoryResult.textContent = label;
  elements.averageTicketResult.textContent = formatCurrency(result.averageTicket);
  elements.currentSalesResult.textContent = integerFormatter.format(result.currentSales);
  elements.bmfSalesResult.textContent = integerFormatter.format(result.bmfSales);

  /* Nova visão do especialista: Antes/Depois */
  elements.comparisonCurrentProfit.textContent = formatCurrency(result.specialistCurrentProfit);
  elements.comparisonCurrentSales.textContent = `${integerFormatter.format(result.currentSales)} vendas`;
  elements.comparisonCurrentMargin.textContent = `margem ${formatPercent(result.specialistMargin)}`;

  elements.comparisonTotalProfit.textContent = formatCurrency(result.specialistTotalProfitWithBmf);
  elements.comparisonTotalSales.textContent = `${integerFormatter.format(result.currentSales + result.bmfSales)} vendas`;
  elements.comparisonNetMargin.textContent = `margem líquida ${formatPercent(result.specialistNetIncrementalMargin)}`;

  /* Banner de crescimento */
  elements.growthAmount.textContent = formatSignedCurrency(result.specialistIncrementalNetProfit);
  elements.growthText.textContent = `de lucro adicional por mês (${formatPercent(Math.abs(result.growthPercent))})`;

  /* ROI */
  elements.specialistRoi.textContent = formatRatio(result.profitRoi);
  elements.specialistRoiText.textContent = `A cada R$ 1 em comissão, ${formatCurrency(Math.abs(result.profitRoi))} em lucro novo.`;
  elements.specialistCommission.textContent = formatCurrency(result.commissionPaid);
  elements.specialistCommissionText.textContent = `${formatPercent(result.totalCommissionRate)} sobre ${formatCurrency(result.incrementalGmv)} — apenas sobre vendas BMF.`;
  elements.consultantRevenue.textContent = formatSignedCurrency(result.consultantRevenue);
  elements.consultantOpportunities.textContent = integerFormatter.format(result.bmfSales);
  elements.consultantTakeRate.textContent = formatPercent(result.consultantTakeRate);
  elements.commissionPaid.textContent = formatCurrency(result.commissionPaid);
  elements.commissionPaidDetail.textContent = formatCurrency(result.commissionPaid);
  elements.consultantRevenueDistribution.textContent = formatSignedCurrency(result.consultantRevenue);
  elements.platformRevenue.textContent = formatCurrency(result.platformRevenue);
  elements.currentRevenue.textContent = formatCurrency(result.currentRevenue);
  elements.specialistCurrentProfit.textContent = formatCurrency(result.specialistCurrentProfit);
  elements.incrementalGmv.textContent = formatCurrency(result.incrementalGmv);
  elements.specialistIncrementalGrossProfit.textContent = formatCurrency(result.specialistIncrementalGrossProfit);
  elements.specialistIncrementalNetProfitDetail.textContent = formatSignedCurrency(result.specialistIncrementalNetProfit);
  elements.totalCommissionRate.textContent = formatPercent(result.totalCommissionRate);
  elements.platformTakeRate.textContent = formatPercent(result.platformTakeRate);
  elements.taxValue.textContent = formatCurrency(result.taxValue);
  elements.totalCosts.textContent = formatCurrency(result.totalCosts);
  elements.platformFinalResult.textContent = formatCurrency(result.platformFinalResult);
}

function updateCalculator() {
  readFormIntoActiveCategory();

  const errors = validateCategoryState(categoryState);

  if (errors.length > 0) {
    setAlert(errors[0]);
    renderEmptyState();
    return;
  }

  const resultsByCategory = Object.fromEntries(
    Object.entries(categoryState).map(([key, values]) => [key, calculateCategory(values)]),
  );
  const consolidated = calculateConsolidated(resultsByCategory);
  const isConsolidated = activeResultCategory === "consolidado";
  const selectedResult = isConsolidated
    ? consolidated
    : resultsByCategory[activeResultCategory];
  const selectedLabel = isConsolidated
    ? "Consolidado"
    : CATEGORIES[activeResultCategory].label;

  clearAlert();
  toggleViewMode(isConsolidated);
  renderTabs();
  renderResults(selectedResult, selectedLabel);

  if (isConsolidated) {
    renderConsolidatedView(resultsByCategory, consolidated);
  }
}

function syncSplitFrom(source) {
  if (syncingSplit) {
    return;
  }

  syncingSplit = true;

  if (source === "platform") {
    const platformValue = clampPercent(parseDecimalNumber(elements.platformSplit.value));
    setPercentInput(elements.platformSplit, platformValue);
    setPercentInput(elements.consultantSplit, 100 - platformValue);
  } else {
    const consultantValue = clampPercent(parseDecimalNumber(elements.consultantSplit.value));
    setPercentInput(elements.consultantSplit, consultantValue);
    setPercentInput(elements.platformSplit, 100 - consultantValue);
  }

  syncingSplit = false;
  updateCalculator();
}

function openSidebar() {
  document.body.classList.add("sidebar-open");
}

function closeSidebar() {
  document.body.classList.remove("sidebar-open");
}

function resetDefaults() {
  categoryState = createDefaultState();
  activeEditCategory = "carro_luxo";
  activeResultCategory = "carro_luxo";
  loadCategoryIntoForm(activeEditCategory);
  closeSidebar();
  updateCalculator();
}

elements.form.addEventListener("input", (event) => {
  if (
    event.target === elements.averageTicket ||
    event.target === elements.variableCosts ||
    event.target === elements.fixedCosts
  ) {
    formatIntegerInput(event.target);
  }

  if (event.target === elements.platformSplit) {
    syncSplitFrom("platform");
    return;
  }

  if (event.target === elements.consultantSplit) {
    syncSplitFrom("consultant");
    return;
  }

  updateCalculator();
});

elements.form.addEventListener("change", updateCalculator);

elements.editTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    updateCalculator();
    activeEditCategory = tab.dataset.editCategory;
    activeResultCategory = tab.dataset.editCategory;
    loadCategoryIntoForm(activeEditCategory);
    updateCalculator();
  });
});

elements.resultTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activeResultCategory = tab.dataset.resultCategory;
    updateCalculator();
  });
});

elements.resetDefaults.addEventListener("click", resetDefaults);
elements.openParameters.addEventListener("click", openSidebar);
if (elements.openParametersTop) {
  elements.openParametersTop.addEventListener("click", openSidebar);
}
elements.closeParameters.addEventListener("click", closeSidebar);
elements.sidebarBackdrop.addEventListener("click", closeSidebar);

resetDefaults();
