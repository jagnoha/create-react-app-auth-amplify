import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class PriceType {
  readonly MSRP?: number;
  readonly MAP?: number;
  readonly store?: number;
  readonly ebay?: number;
  readonly amazon?: number;
  readonly wholesaleLow?: number;
  readonly wholesaleHigh?: number;
  readonly scratchLow?: number;
  readonly scratchHigh?: number;
  constructor(init: ModelInit<PriceType>);
}

export declare class DimensionsType {
  readonly height?: number;
  readonly length?: number;
  readonly width?: number;
  constructor(init: ModelInit<DimensionsType>);
}

export declare class ImagesType {
  readonly image1?: string;
  readonly image2?: string;
  readonly image3?: string;
  readonly image4?: string;
  readonly image5?: string;
  readonly image6?: string;
  readonly image7?: string;
  readonly image8?: string;
  readonly image9?: string;
  readonly image10?: string;
  constructor(init: ModelInit<ImagesType>);
}

export declare class BulletPointsType {
  readonly bullet1?: string;
  readonly bullet2?: string;
  readonly bullet3?: string;
  readonly bullet4?: string;
  readonly bullet5?: string;
  readonly bullet6?: string;
  readonly bullet7?: string;
  constructor(init: ModelInit<BulletPointsType>);
}

export declare class DescriptionType {
  readonly store?: string;
  readonly ebay?: string;
  readonly amazon?: string;
  constructor(init: ModelInit<DescriptionType>);
}

export declare class TitleType {
  readonly store?: string;
  readonly ebay?: string;
  readonly amazon?: string;
  constructor(init: ModelInit<TitleType>);
}

export declare class SourceType {
  readonly warehouse?: boolean;
  readonly dropship?: boolean;
  constructor(init: ModelInit<SourceType>);
}

export declare class Product {
  readonly id: string;
  readonly SKU?: string;
  readonly legacyID?: string;
  readonly mpn?: string;
  readonly Attributes?: string;
  readonly parentSKU?: string;
  readonly source?: SourceType;
  readonly brandID?: string;
  readonly manufacturerID?: string;
  readonly categoryID?: string;
  readonly subcategoryID?: string;
  readonly subcategory2ID?: string;
  readonly ebaystorecategoryID?: string;
  readonly binLocation?: string;
  readonly title?: TitleType;
  readonly description?: DescriptionType;
  readonly bulletPoints?: BulletPointsType;
  readonly images?: ImagesType;
  readonly handle?: string;
  readonly weight?: number;
  readonly dimensionalWeight?: number;
  readonly appliedWeight?: number;
  readonly dimensions?: DimensionsType;
  readonly shopifyFitmentTags?: string;
  readonly shopifyOnlyTags?: string;
  readonly price?: PriceType;
  readonly cost?: number;
  readonly options?: string;
  readonly updateFlag?: boolean;
  readonly status?: string;
  readonly shopifyMetaTitle?: string;
  readonly shopifyMetaDescription?: string;
  constructor(init: ModelInit<Product>);
  static copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

export declare class Attribute {
  readonly id: string;
  readonly name?: string;
  readonly AttributeSubCategories?: (AttributeSubCategory | null)[];
  constructor(init: ModelInit<Attribute>);
  static copyOf(source: Attribute, mutator: (draft: MutableModel<Attribute>) => MutableModel<Attribute> | void): Attribute;
}

export declare class AttributeSubCategory {
  readonly id: string;
  readonly attribute: Attribute;
  readonly subcategory: SubCategory;
  constructor(init: ModelInit<AttributeSubCategory>);
  static copyOf(source: AttributeSubCategory, mutator: (draft: MutableModel<AttributeSubCategory>) => MutableModel<AttributeSubCategory> | void): AttributeSubCategory;
}

export declare class SubCategory {
  readonly id: string;
  readonly name?: string;
  readonly categoryID?: string;
  readonly attributes?: (AttributeSubCategory | null)[];
  readonly Products?: (Product | null)[];
  constructor(init: ModelInit<SubCategory>);
  static copyOf(source: SubCategory, mutator: (draft: MutableModel<SubCategory>) => MutableModel<SubCategory> | void): SubCategory;
}

export declare class SubCategory2 {
  readonly id: string;
  readonly name?: string;
  readonly Products?: (Product | null)[];
  constructor(init: ModelInit<SubCategory2>);
  static copyOf(source: SubCategory2, mutator: (draft: MutableModel<SubCategory2>) => MutableModel<SubCategory2> | void): SubCategory2;
}

export declare class Category {
  readonly id: string;
  readonly name?: string;
  readonly SubCategories?: (SubCategory | null)[];
  readonly Products?: (Product | null)[];
  constructor(init: ModelInit<Category>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

export declare class Brand {
  readonly id: string;
  readonly name?: string;
  readonly Products?: (Product | null)[];
  constructor(init: ModelInit<Brand>);
  static copyOf(source: Brand, mutator: (draft: MutableModel<Brand>) => MutableModel<Brand> | void): Brand;
}

export declare class Manufacturer {
  readonly id: string;
  readonly name?: string;
  readonly Products?: (Product | null)[];
  constructor(init: ModelInit<Manufacturer>);
  static copyOf(source: Manufacturer, mutator: (draft: MutableModel<Manufacturer>) => MutableModel<Manufacturer> | void): Manufacturer;
}

export declare class EbayStoreCategory {
  readonly id: string;
  readonly name?: string;
  readonly code?: string;
  readonly Products?: (Product | null)[];
  constructor(init: ModelInit<EbayStoreCategory>);
  static copyOf(source: EbayStoreCategory, mutator: (draft: MutableModel<EbayStoreCategory>) => MutableModel<EbayStoreCategory> | void): EbayStoreCategory;
}