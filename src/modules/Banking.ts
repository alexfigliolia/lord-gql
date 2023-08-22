export class Banking {
  public static amex = new RegExp("^3[47][0-9]{13}$");
  public static visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
  public static cup1 = new RegExp("^62[0-9]{14}[0-9]*$");
  public static cup2 = new RegExp("^81[0-9]{14}[0-9]*$");

  public static mastercard = new RegExp("^5[1-5][0-9]{14}$");
  public static mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

  public static disco1 = new RegExp("^6011[0-9]{12}[0-9]*$");
  public static disco2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
  public static disco3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

  public static diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
  public static jcb = new RegExp("^35[0-9]{14}[0-9]*$");

  public static cardType(cc: string) {
    if (this.visa.test(cc)) {
      return "Visa";
    }
    if (this.amex.test(cc)) {
      return "American Express";
    }
    if (this.mastercard.test(cc) || this.mastercard2.test(cc)) {
      return "Master Card";
    }
    if (this.disco1.test(cc) || this.disco2.test(cc) || this.disco3.test(cc)) {
      return "Discover";
    }
    if (this.diners.test(cc)) {
      return "Diners";
    }
    if (this.jcb.test(cc)) {
      return "JCB";
    }
    if (this.cup1.test(cc) || this.cup2.test(cc)) {
      return "China Union Pay";
    }
    return "Debit Card";
  }
}
