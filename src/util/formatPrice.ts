export const formatPrice = (price: string) =>
    Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 2
    }).format(parseFloat(price));