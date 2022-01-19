// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Product, Attribute, AttributeSubCategory, SubCategory, SubCategory2, Category, Brand, Manufacturer, EbayStoreCategory, PriceType, DimensionsType, ImagesType, BulletPointsType, DescriptionType, TitleType, SourceType } = initSchema(schema);

export {
  Product,
  Attribute,
  AttributeSubCategory,
  SubCategory,
  SubCategory2,
  Category,
  Brand,
  Manufacturer,
  EbayStoreCategory,
  PriceType,
  DimensionsType,
  ImagesType,
  BulletPointsType,
  DescriptionType,
  TitleType,
  SourceType
};