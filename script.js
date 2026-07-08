const CATEGORIES = {
  carro_luxo: {
    label: "Carro de luxo",
    shortLabel: "Carro",
    averageTicket: 1000000,
    currentSales: 10,
    bmfSales: 1,
    commission: 5,
  },
  barco: {
    label: "Barco",
    shortLabel: "Barco",
    averageTicket: 2000000,
    currentSales: 5,
    bmfSales: 1,
    commission: 3,
  },
  aeronave: {
    label: "Aeronave",
    shortLabel: "Aeronave",
    averageTicket: 10000000,
    currentSales: 1,
    bmfSales: 1,
    commission: 1,
  },
};

const DEFAULT_COMMISSION_TAKE_RATE = 15;
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
  totalCommission: document.querySelector("#totalCommission"),
  commissionTakeRate: document.querySelector("#commissionTakeRate"),
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
  premiseCurrentGmv: document.querySelector("#premiseCurrentGmv"),
  premiseIncrementalGmv: document.querySelector("#premiseIncrementalGmv"),
  comparisonCurrentCommission: document.querySelector("#comparisonCurrentCommission"),
  comparisonCurrentSales: document.querySelector("#comparisonCurrentSales"),
  comparisonCurrentRate: document.querySelector("#comparisonCurrentRate"),
  comparisonCurrentGmvValue: document.querySelector("#comparisonCurrentGmvValue"),
  comparisonTotalCommission: document.querySelector("#comparisonTotalCommission"),
  comparisonTotalSales: document.querySelector("#comparisonTotalSales"),
  comparisonNetRetention: document.querySelector("#comparisonNetRetention"),
  comparisonTotalGmvValue: document.querySelector("#comparisonTotalGmvValue"),
  growthAmount: document.querySelector("#growthAmount"),
  growthText: document.querySelector("#growthText"),
  growthGmvContext: document.querySelector("#growthGmvContext"),
  gmvHighlightCurrent: document.querySelector("#gmvHighlightCurrent"),
  gmvHighlightTotal: document.querySelector("#gmvHighlightTotal"),
  gmvHighlightConsolidatedCurrent: document.querySelector("#gmvHighlightConsolidatedCurrent"),
  gmvHighlightConsolidatedTotal: document.querySelector("#gmvHighlightConsolidatedTotal"),
  specialistGrossCommission: document.querySelector("#specialistGrossCommission"),
  specialistGrossCommissionText: document.querySelector("#specialistGrossCommissionText"),
  bmfPassThroughCard: document.querySelector("#bmfPassThroughCard"),
  bmfPassThroughText: document.querySelector("#bmfPassThroughText"),
  specialistNetCommissionCard: document.querySelector("#specialistNetCommissionCard"),
  specialistNetCommissionText: document.querySelector("#specialistNetCommissionText"),
  commissionTakeRateCard: document.querySelector("#commissionTakeRateCard"),
  commissionTakeRateText: document.querySelector("#commissionTakeRateText"),
  consultantRevenue: document.querySelector("#consultantRevenue"),
  consultantOpportunities: document.querySelector("#consultantOpportunities"),
  consultantTakeRate: document.querySelector("#consultantTakeRate"),
  bmfPassThrough: document.querySelector("#bmfPassThrough"),
  bmfPassThroughDetail: document.querySelector("#bmfPassThroughDetail"),
  consultantRevenueDistribution: document.querySelector("#consultantRevenueDistribution"),
  platformRevenue: document.querySelector("#platformRevenue"),
  flowIncrementalGmv: document.querySelector("#flowIncrementalGmv"),
  flowGrossCommission: document.querySelector("#flowGrossCommission"),
  flowBmfPassThrough: document.querySelector("#flowBmfPassThrough"),
  flowPlatform: document.querySelector("#flowPlatform"),
  flowConsultant: document.querySelector("#flowConsultant"),
  currentGmv: document.querySelector("#currentGmv"),
  specialistCurrentCommission: document.querySelector("#specialistCurrentCommission"),
  incrementalGmv: document.querySelector("#incrementalGmv"),
  specialistIncrementalGrossCommission: document.querySelector("#specialistIncrementalGrossCommission"),
  specialistIncrementalNetCommissionDetail: document.querySelector("#specialistIncrementalNetCommissionDetail"),
  totalCommissionRate: document.querySelector("#totalCommissionRate"),
  platformTakeRate: document.querySelector("#platformTakeRate"),
  taxValue: document.querySelector("#taxValue"),
  totalCosts: document.querySelector("#totalCosts"),
  platformFinalResult: document.querySelector("#platformFinalResult"),
  specialistViews: document.querySelectorAll(".specialist-view"),
  consolidatedViews: document.querySelectorAll(".consolidated-view"),
  consolidatedCurrentCommission: document.querySelector("#consolidatedCurrentCommission"),
  consolidatedCurrentSales: document.querySelector("#consolidatedCurrentSales"),
  consolidatedCurrentRate: document.querySelector("#consolidatedCurrentRate"),
  consolidatedTotalCommission: document.querySelector("#consolidatedTotalCommission"),
  consolidatedTotalSales: document.querySelector("#consolidatedTotalSales"),
  consolidatedNetRetention: document.querySelector("#consolidatedNetRetention"),
  consolidatedGrowth: document.querySelector("#consolidatedGrowth"),
  consolidatedGrowthText: document.querySelector("#consolidatedGrowthText"),
  consolidatedGrowthGmvContext: document.querySelector("#consolidatedGrowthGmvContext"),
  consolidatedBmfPassThrough: document.querySelector("#consolidatedBmfPassThrough"),
  consolidatedConsultantRevenue: document.querySelector("#consolidatedConsultantRevenue"),
  consolidatedPlatformResult: document.querySelector("#consolidatedPlatformResult"),
  breakdownCarGmv: document.querySelector("#breakdownCarGmv"),
  breakdownCarNetCommission: document.querySelector("#breakdownCarNetCommission"),
  breakdownCarPassThrough: document.querySelector("#breakdownCarPassThrough"),
  breakdownCarPlatform: document.querySelector("#breakdownCarPlatform"),
  breakdownBoatGmv: document.querySelector("#breakdownBoatGmv"),
  breakdownBoatNetCommission: document.querySelector("#breakdownBoatNetCommission"),
  breakdownBoatPassThrough: document.querySelector("#breakdownBoatPassThrough"),
  breakdownBoatPlatform: document.querySelector("#breakdownBoatPlatform"),
  breakdownAircraftGmv: document.querySelector("#breakdownAircraftGmv"),
  breakdownAircraftNetCommission: document.querySelector("#breakdownAircraftNetCommission"),
  breakdownAircraftPassThrough: document.querySelector("#breakdownAircraftPassThrough"),
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
        totalCommission: category.commission,
        commissionTakeRate: DEFAULT_COMMISSION_TAKE_RATE,
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
    totalCommission: parseDecimalNumber(elements.totalCommission.value),
    commissionTakeRate: parseDecimalNumber(elements.commissionTakeRate.value),
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
  setPercentInput(elements.totalCommission, state.totalCommission);
  setPercentInput(elements.commissionTakeRate, state.commissionTakeRate);
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
      values.commissionTakeRate < 0 ||
      values.platformSplit < 0 ||
      values.consultantSplit < 0 ||
      values.taxRate < 0
    ) {
      errors.push(`${label}: percentuais não podem ser negativos.`);
    }

    if (
      values.totalCommission > 100 ||
      values.commissionTakeRate > 100 ||
      values.platformSplit > 100 ||
      values.consultantSplit > 100
    ) {
      errors.push(`${label}: percentuais devem ficar entre 0% e 100%.`);
    }

    if (values.variableCosts < 0 || values.fixedCosts < 0) {
      errors.push(`${label}: custos não podem ser negativos.`);
    }
  });

  return errors;
}

function calculateCategory(values) {
  const currentGmv = values.averageTicket * values.currentSales;
  const incrementalGmv = values.averageTicket * values.bmfSales;
  const specialistCurrentCommission = currentGmv * (values.totalCommission / 100);
  const specialistIncrementalGrossCommission = incrementalGmv * (values.totalCommission / 100);
  const bmfPassThrough = specialistIncrementalGrossCommission * (values.commissionTakeRate / 100);
  const specialistIncrementalNetCommission = specialistIncrementalGrossCommission - bmfPassThrough;
  const specialistTotalCommissionWithBmf =
    specialistCurrentCommission + specialistIncrementalNetCommission;
  const platformRevenue = bmfPassThrough * (values.platformSplit / 100);
  const consultantRevenue = bmfPassThrough * (values.consultantSplit / 100);
  const taxValue = platformRevenue * (values.taxRate / 100);
  const totalCosts = values.variableCosts + values.fixedCosts;
  const platformFinalResult = platformRevenue - taxValue - totalCosts;
  const platformTakeRate = incrementalGmv > 0 ? (platformRevenue / incrementalGmv) * 100 : 0;
  const consultantTakeRate = incrementalGmv > 0 ? (consultantRevenue / incrementalGmv) * 100 : 0;
  const actualCommissionTakeRate =
    specialistIncrementalGrossCommission > 0
      ? (bmfPassThrough / specialistIncrementalGrossCommission) * 100
      : 0;
  const specialistNetRetentionRate =
    specialistIncrementalGrossCommission > 0
      ? (specialistIncrementalNetCommission / specialistIncrementalGrossCommission) * 100
      : 0;
  const growthPercent =
    specialistCurrentCommission > 0
      ? (specialistIncrementalNetCommission / specialistCurrentCommission) * 100
      : 0;

  return {
    ...values,
    currentGmv,
    incrementalGmv,
    specialistCurrentCommission,
    specialistIncrementalGrossCommission,
    bmfPassThrough,
    specialistIncrementalNetCommission,
    specialistTotalCommissionWithBmf,
    platformRevenue,
    consultantRevenue,
    taxValue,
    totalCosts,
    platformFinalResult,
    totalCommissionRate: values.totalCommission,
    actualCommissionTakeRate,
    specialistNetRetentionRate,
    platformTakeRate,
    consultantTakeRate,
    growthPercent,
  };
}

function calculateConsolidated(resultsByCategory) {
  const results = Object.values(resultsByCategory);
  const sum = (key) => results.reduce((total, result) => total + result[key], 0);
  const incrementalGmv = sum("incrementalGmv");
  const specialistIncrementalGrossCommission = sum("specialistIncrementalGrossCommission");
  const bmfPassThrough = sum("bmfPassThrough");
  const specialistIncrementalNetCommission = sum("specialistIncrementalNetCommission");
  const platformRevenue = sum("platformRevenue");
  const consultantRevenue = sum("consultantRevenue");
  const taxValue = sum("taxValue");
  const totalCosts = sum("totalCosts");
  const currentSales = sum("currentSales");
  const bmfSales = sum("bmfSales");
  const specialistCurrentCommission = sum("specialistCurrentCommission");

  return {
    averageTicket: (sum("currentGmv") + incrementalGmv) / Math.max(1, currentSales + bmfSales),
    currentSales,
    bmfSales,
    currentGmv: sum("currentGmv"),
    incrementalGmv,
    specialistCurrentCommission,
    specialistIncrementalGrossCommission,
    bmfPassThrough,
    specialistIncrementalNetCommission,
    specialistTotalCommissionWithBmf: sum("specialistTotalCommissionWithBmf"),
    platformRevenue,
    consultantRevenue,
    taxValue,
    totalCosts,
    platformFinalResult: platformRevenue - taxValue - totalCosts,
    totalCommissionRate:
      incrementalGmv > 0 ? (specialistIncrementalGrossCommission / incrementalGmv) * 100 : 0,
    actualCommissionTakeRate:
      specialistIncrementalGrossCommission > 0
        ? (bmfPassThrough / specialistIncrementalGrossCommission) * 100
        : 0,
    specialistNetRetentionRate:
      specialistIncrementalGrossCommission > 0
        ? (specialistIncrementalNetCommission / specialistIncrementalGrossCommission) * 100
        : 0,
    platformTakeRate: incrementalGmv > 0 ? (platformRevenue / incrementalGmv) * 100 : 0,
    consultantTakeRate: incrementalGmv > 0 ? (consultantRevenue / incrementalGmv) * 100 : 0,
    taxRate: platformRevenue > 0 ? (taxValue / platformRevenue) * 100 : 0,
    platformSplit: bmfPassThrough > 0 ? (platformRevenue / bmfPassThrough) * 100 : 50,
    consultantSplit: bmfPassThrough > 0 ? (consultantRevenue / bmfPassThrough) * 100 : 50,
    growthPercent:
      specialistCurrentCommission > 0
        ? (specialistIncrementalNetCommission / specialistCurrentCommission) * 100
        : 0,
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
    elements.premiseCurrentGmv,
    elements.premiseIncrementalGmv,
    elements.comparisonCurrentCommission,
    elements.comparisonTotalCommission,
    elements.comparisonCurrentGmvValue,
    elements.comparisonTotalGmvValue,
    elements.growthAmount,
    elements.growthGmvContext,
    elements.specialistGrossCommission,
    elements.bmfPassThroughCard,
    elements.specialistNetCommissionCard,
    elements.commissionTakeRateCard,
    elements.consultantRevenue,
    elements.consultantOpportunities,
    elements.consultantTakeRate,
    elements.bmfPassThrough,
    elements.bmfPassThroughDetail,
    elements.consultantRevenueDistribution,
    elements.platformRevenue,
    elements.currentGmv,
    elements.specialistCurrentCommission,
    elements.incrementalGmv,
    elements.specialistIncrementalGrossCommission,
    elements.specialistIncrementalNetCommissionDetail,
    elements.totalCommissionRate,
    elements.platformTakeRate,
    elements.taxValue,
    elements.totalCosts,
    elements.platformFinalResult,
    elements.gmvHighlightCurrent,
    elements.gmvHighlightTotal,
    elements.gmvHighlightConsolidatedCurrent,
    elements.gmvHighlightConsolidatedTotal,
    elements.flowIncrementalGmv,
    elements.flowGrossCommission,
    elements.flowBmfPassThrough,
    elements.flowPlatform,
    elements.flowConsultant,
  ].forEach((element) => {
    if (element) {
      element.textContent = "Não calculado";
    }
  });

  elements.specialistGrossCommissionText.textContent = "Sobre as vendas originadas pela BMF.";
  elements.bmfPassThroughText.textContent = "Percentual da comissão bruta repassado para a BMF.";
  elements.specialistNetCommissionText.textContent = "Comissão incremental depois do repasse BMF.";
  elements.commissionTakeRateText.textContent = "Take rate aplicado sobre a comissão do especialista.";
    elements.growthGmvContext.textContent = "R$ 0";
    elements.comparisonCurrentSales.textContent = "0 vendas";
    elements.comparisonCurrentRate.textContent = "comissão 0%";
    elements.comparisonTotalSales.textContent = "0 vendas";
    elements.comparisonNetRetention.textContent = "retenção líquida 0%";

  if (elements.consolidatedCurrentCommission) {
    elements.consolidatedCurrentSales.textContent = "0 vendas";
    elements.consolidatedCurrentRate.textContent = "comissão média 0%";
    elements.consolidatedTotalSales.textContent = "0 vendas";
    elements.consolidatedNetRetention.textContent = "retenção líquida 0%";
    elements.consolidatedGrowthText.textContent = "de receita líquida adicional em 3 categorias";
    elements.consolidatedGrowthGmvContext.textContent = "R$ 0";
  }
}

function toggleViewMode(isConsolidated) {
  elements.specialistViews.forEach((el) => {
    el.hidden = isConsolidated;
  });
  elements.consolidatedViews.forEach((el) => {
    el.hidden = !isConsolidated;
  });

  // O gmvHighlight individual fica fora da specialist-view, precisa de toggle manual
  const gmvHighlight = document.querySelector("#gmvHighlight");
  if (gmvHighlight) {
    gmvHighlight.hidden = isConsolidated;
  }
}

function renderConsolidatedView(resultsByCategory, consolidated) {
  // GMV highlight bar - consolidated
  elements.gmvHighlightConsolidatedCurrent.textContent = formatCurrency(
    consolidated.currentGmv,
  );
  elements.gmvHighlightConsolidatedTotal.textContent = formatCurrency(
    consolidated.currentGmv + consolidated.incrementalGmv,
  );

  elements.consolidatedCurrentCommission.textContent = formatCurrency(
    consolidated.specialistCurrentCommission,
  );
  elements.consolidatedCurrentSales.textContent = `${integerFormatter.format(
    consolidated.currentSales,
  )} vendas`;
  elements.consolidatedCurrentRate.textContent = `comissão média ${formatPercent(
    consolidated.totalCommissionRate,
  )}`;

  elements.consolidatedTotalCommission.textContent = formatCurrency(
    consolidated.specialistTotalCommissionWithBmf,
  );
  elements.consolidatedTotalSales.textContent = `${integerFormatter.format(
    consolidated.currentSales + consolidated.bmfSales,
  )} vendas`;
  elements.consolidatedNetRetention.textContent = `retenção líquida ${formatPercent(
    consolidated.specialistNetRetentionRate,
  )}`;

  elements.consolidatedGrowth.textContent = formatSignedCurrency(
    consolidated.specialistIncrementalNetCommission,
  );
  elements.consolidatedGrowthText.textContent = `de receita líquida adicional com ${integerFormatter.format(
    consolidated.bmfSales,
  )} novas vendas em 3 categorias`;
  elements.consolidatedGrowthGmvContext.textContent = formatCurrency(
    consolidated.incrementalGmv,
  );

  elements.consolidatedBmfPassThrough.textContent = formatCurrency(consolidated.bmfPassThrough);
  elements.consolidatedConsultantRevenue.textContent = formatSignedCurrency(
    consolidated.consultantRevenue,
  );
  elements.consolidatedPlatformResult.textContent = formatCurrency(consolidated.platformFinalResult);

  const car = resultsByCategory.carro_luxo;
  const boat = resultsByCategory.barco;
  const aircraft = resultsByCategory.aeronave;

  elements.breakdownCarGmv.textContent = formatCurrency(car.incrementalGmv);
  elements.breakdownCarNetCommission.textContent = formatSignedCurrency(
    car.specialistIncrementalNetCommission,
  );
  elements.breakdownCarPassThrough.textContent = formatCurrency(car.bmfPassThrough);
  elements.breakdownCarPlatform.textContent = formatCurrency(car.platformRevenue);

  elements.breakdownBoatGmv.textContent = formatCurrency(boat.incrementalGmv);
  elements.breakdownBoatNetCommission.textContent = formatSignedCurrency(
    boat.specialistIncrementalNetCommission,
  );
  elements.breakdownBoatPassThrough.textContent = formatCurrency(boat.bmfPassThrough);
  elements.breakdownBoatPlatform.textContent = formatCurrency(boat.platformRevenue);

  elements.breakdownAircraftGmv.textContent = formatCurrency(aircraft.incrementalGmv);
  elements.breakdownAircraftNetCommission.textContent = formatSignedCurrency(
    aircraft.specialistIncrementalNetCommission,
  );
  elements.breakdownAircraftPassThrough.textContent = formatCurrency(aircraft.bmfPassThrough);
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
  elements.premiseCurrentGmv.textContent = formatCurrency(result.currentGmv);
  elements.premiseIncrementalGmv.textContent = formatCurrency(result.incrementalGmv);

  // GMV highlight bar
  elements.gmvHighlightCurrent.textContent = formatCurrency(result.currentGmv);
  elements.gmvHighlightTotal.textContent = formatCurrency(
    result.currentGmv + result.incrementalGmv,
  );

  elements.comparisonCurrentCommission.textContent = formatCurrency(
    result.specialistCurrentCommission,
  );
  elements.comparisonCurrentSales.textContent = `${integerFormatter.format(
    result.currentSales,
  )} vendas`;
  elements.comparisonCurrentRate.textContent = `comissão ${formatPercent(result.totalCommissionRate)}`;
  elements.comparisonCurrentGmvValue.textContent = formatCurrency(result.currentGmv);

  elements.comparisonTotalCommission.textContent = formatCurrency(
    result.specialistTotalCommissionWithBmf,
  );
  elements.comparisonTotalSales.textContent = `${integerFormatter.format(
    result.currentSales + result.bmfSales,
  )} vendas`;
  elements.comparisonNetRetention.textContent = `retenção líquida ${formatPercent(
    result.specialistNetRetentionRate,
  )}`;
  elements.comparisonTotalGmvValue.textContent = formatCurrency(
    result.currentGmv + result.incrementalGmv,
  );

  elements.growthAmount.textContent = formatSignedCurrency(
    result.specialistIncrementalNetCommission,
  );
  elements.growthText.textContent = `de receita líquida adicional por mês (${formatPercent(
    Math.abs(result.growthPercent),
  )})`;
  elements.growthGmvContext.textContent = formatCurrency(result.incrementalGmv);

  elements.specialistGrossCommission.textContent = formatCurrency(
    result.specialistIncrementalGrossCommission,
  );
  elements.specialistGrossCommissionText.textContent = `${formatPercent(
    result.totalCommissionRate,
  )} sobre ${formatCurrency(result.incrementalGmv)} em vendas BMF.`;
  elements.bmfPassThroughCard.textContent = formatCurrency(result.bmfPassThrough);
  elements.bmfPassThroughText.textContent = `${formatPercent(
    result.actualCommissionTakeRate,
  )} da comissão bruta do especialista.`;
  elements.specialistNetCommissionCard.textContent = formatCurrency(
    result.specialistIncrementalNetCommission,
  );
  elements.specialistNetCommissionText.textContent = `${formatPercent(
    result.specialistNetRetentionRate,
  )} da comissão incremental fica com o especialista.`;
  elements.commissionTakeRateCard.textContent = formatPercent(result.actualCommissionTakeRate);
  elements.commissionTakeRateText.textContent = "Percentual da comissão capturado pela BMF.";

  elements.consultantRevenue.textContent = formatSignedCurrency(result.consultantRevenue);
  elements.consultantOpportunities.textContent = integerFormatter.format(result.bmfSales);
  elements.consultantTakeRate.textContent = formatPercent(result.consultantTakeRate);
  elements.bmfPassThrough.textContent = formatCurrency(result.bmfPassThrough);
  elements.bmfPassThroughDetail.textContent = formatCurrency(result.bmfPassThrough);
  elements.consultantRevenueDistribution.textContent = formatSignedCurrency(result.consultantRevenue);
  elements.platformRevenue.textContent = formatCurrency(result.platformRevenue);
  elements.currentGmv.textContent = formatCurrency(result.currentGmv);
  elements.specialistCurrentCommission.textContent = formatCurrency(
    result.specialistCurrentCommission,
  );
  elements.incrementalGmv.textContent = formatCurrency(result.incrementalGmv);
  elements.specialistIncrementalGrossCommission.textContent = formatCurrency(
    result.specialistIncrementalGrossCommission,
  );
  elements.specialistIncrementalNetCommissionDetail.textContent = formatSignedCurrency(
    result.specialistIncrementalNetCommission,
  );
  elements.totalCommissionRate.textContent = formatPercent(result.totalCommissionRate);
  elements.platformTakeRate.textContent = formatPercent(result.platformTakeRate);
  elements.taxValue.textContent = formatCurrency(result.taxValue);
  elements.totalCosts.textContent = formatCurrency(result.totalCosts);
  elements.platformFinalResult.textContent = formatCurrency(result.platformFinalResult);

  // Money flow
  elements.flowIncrementalGmv.textContent = formatCurrency(result.incrementalGmv);
  elements.flowGrossCommission.textContent = formatCurrency(
    result.specialistIncrementalGrossCommission,
  );
  elements.flowBmfPassThrough.textContent = formatCurrency(result.bmfPassThrough);
  elements.flowPlatform.textContent = formatCurrency(result.platformRevenue);
  elements.flowConsultant.textContent = formatSignedCurrency(result.consultantRevenue);
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
  const selectedResult = isConsolidated ? consolidated : resultsByCategory[activeResultCategory];
  const selectedLabel = isConsolidated ? "Consolidado" : CATEGORIES[activeResultCategory].label;

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
