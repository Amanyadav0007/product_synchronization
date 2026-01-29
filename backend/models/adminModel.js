import mongoose from "mongoose";

const adminSechma = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    business: { type: String, default: "" },
    logo: {
      type: String,
      default:
        "iVBORw0KGgoAAAANSUhEUgAAACEAAAAnCAYAAACBvSFyAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAN4SURBVHgBzVg7ctpAGF4BRbrQ2TMuopzAiu2CVMFdOucGOCcInMBwAsMJwCeIXaU0dGQGiLiBUpF0KhmGR75PrMhK6LHi4fE/s7MP7e7/7b//a2WIHejq6qq8Wq0qKGV0TTlss+RyuYfBYNAVGcjIMtmyLDOfz7cl8yTqLJfLhm3bjjgkCACwcMpnNIuaSxwAudYBkhMaRAkAwHcfACThgkEd5cNoNDJYpHQ6yjKuecbaVNB5oUFnZ2dtVCUJwEH5iBM+/QH5c9D8PZlMnk5OTsaGYXzG0BuCRnuK8V7S/qnXIa/hl9/H6d+niRhLqlhzL7uuXOPGzU+9DmxWUbodnTvGnCakZcsur+NTIg+RQhCn5bdxokehSVjX3TDJ5SyxD4jQxm6G6WOlbYpDgYCIdc2T9FZpu3uBoDVsJqeINbSu7LdxjbbYB0RID6o6dk+/gqv7ogz19gIhN/DFWVRMLw5AUXpWjyCRbppFpTorOKEpHNBf5WTW6ekpy098C9w1AxuqH0JRRIC4Ds8LU5bYcYcT1gOL12boSGbUl4DO4CqrkEIrbe+sUXQLSBQxtqAQwIPQoEwgJBAq3X1I8TbMMc4w3tIN4zuBUMAwOJ2DseltZBgMbOOkGPGqaWdJlEolk/VisSjSkxYKBWc6nbq7SEILBBnOZrMbBrNQXhlFBOGg2LQegOyl6UcsCOl0KlRAjZwykaQpt4bD4aM2iMvLSzKmZzRFDNESxPrUfuFcKmuSW4/MOwMgpMY3USoRDG3UPAnduBN394rVWJQiSjliWgN5aX0LhOLzLZU5ShPN1q6mJ5PkOzRvQ586API1AOLi4qKtToTYyLxxKLuPcXI1AGkaEsAtqrYCoA7mDXEEAi/qWlV2vSTYC+UQ+Y0yr3MsACScvMbwLrtUgW8eCFV5+HwTRybw2wQ2KrCf1GzMKkvg2ZVwekfpFjMluoei+XweUHYfxGZQJ4fclyBtm8pPv4NSK8hxR/z3D6y74sikKr8via4/QFt+CWmo5IFgJqSA8B7AiB8V8UKkuu1qRDrPdK3Lxy1qPvld5g380O/3nagN/TwDymficGyfY50p/2nUojxwOIBVpZ8/ynUAzC3C+VbyGzBRPun59wXNjvr8OwRREkxwor4lZlb8QYLqHaRTlgktJeTVcXmDAt5h8ivW8YFv0ae4YPgPspPhtg0cN1gAAAAASUVORK5CYII=",
    },
    gst: { type: String, default: "" },
    pan: { type: String, default: "" },
    msme: { type: String, default: "" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    tnc: { type: [String], default: [] },
    bank: { type: String, default: "" },
    branch: { type: String, default: "" },
    account: { type: String, default: "" },
    ifsc: { type: String, default: "" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: "invoice" }],
  },
  { timestamps: true },
);

const adminModel =
  mongoose.models.admin || mongoose.model("admin", adminSechma);

export default adminModel;
