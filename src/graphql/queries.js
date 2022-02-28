/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      SKU
      legacyID
      mpn
      Attributes
      parentSKU
      source {
        warehouse
        dropship
      }
      brandID
      manufacturerID
      categoryID
      subcategoryID
      subcategory2ID
      ebaystorecategoryID
      binLocation
      title {
        store
        ebay
        amazon
      }
      description {
        store
        ebay
        amazon
      }
      bulletPoints {
        bullet1
        bullet2
        bullet3
        bullet4
        bullet5
        bullet6
        bullet7
      }
      images {
        image1
        image2
        image3
        image4
        image5
        image6
        image7
        image8
        image9
        image10
      }
      handle
      weight
      dimensionalWeight
      appliedWeight
      dimensions {
        height
        length
        width
      }
      shopifyFitmentTags
      shopifyOnlyTags
      price {
        MSRP
        MAP
        store
        ebay
        amazon
        wholesaleLow
        wholesaleHigh
        scratchLow
        scratchHigh
      }
      cost
      options
      updateFlag
      status
      shopifyMetaTitle
      shopifyMetaDescription
      sourceDropship
      sourceWarehouse
      titleStore
      titleEbay
      titleAmazon
      descriptionStore
      descriptionEbay
      descriptionAmazon
      dimensionHeight
      dimensionLength
      dimensionWidth
      priceMSRP
      priceMAP
      priceStore
      priceEbay
      priceAmazon
      priceWholesaleLow
      priceWholesaleHigh
      priceScratchLow
      priceScratchHigh
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        SKU
        legacyID
        mpn
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        binLocation
        handle
        weight
        dimensionalWeight
        appliedWeight
        shopifyFitmentTags
        shopifyOnlyTags
        cost
        options
        updateFlag
        images {
          image1
          image2
          image3
          image4
          image5
          image6
          image7
          image8
          image9
          image10
        }
        status
        shopifyMetaTitle
        shopifyMetaDescription
        sourceDropship
        sourceWarehouse
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const searchProducts = /* GraphQL */ `
  query SearchProducts(
    $filter: SearchableProductFilterInput
    $sort: SearchableProductSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchProducts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        binLocation
        handle
        weight
        dimensionalWeight
        appliedWeight
        shopifyFitmentTags
        shopifyOnlyTags
        cost
        options
        updateFlag
        images {
          image1
          image2
          image3
          image4
          image5
          image6
          image7
          image8
          image9
          image10
        }
        status
        shopifyMetaTitle
        shopifyMetaDescription
        sourceDropship
        sourceWarehouse
        titleStore
        titleEbay
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
export const syncProducts = /* GraphQL */ `
  query SyncProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProducts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        SKU
        legacyID
        mpn
        Attributes
        parentSKU
        brandID
        manufacturerID
        categoryID
        subcategoryID
        subcategory2ID
        ebaystorecategoryID
        binLocation
        handle
        weight
        dimensionalWeight
        appliedWeight
        shopifyFitmentTags
        shopifyOnlyTags
        cost
        options
        updateFlag
        status
        shopifyMetaTitle
        shopifyMetaDescription
        sourceDropship
        sourceWarehouse
        titleStore
        titleEbay
        images {
          image1
          image2
          image3
          image4
          image5
          image6
          image7
          image8
          image9
          image10
        }
        titleAmazon
        descriptionStore
        descriptionEbay
        descriptionAmazon
        dimensionHeight
        dimensionLength
        dimensionWidth
        priceMSRP
        priceMAP
        priceStore
        priceEbay
        priceAmazon
        priceWholesaleLow
        priceWholesaleHigh
        priceScratchLow
        priceScratchHigh
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAttribute = /* GraphQL */ `
  query GetAttribute($id: ID!) {
    getAttribute(id: $id) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      AttributeSubCategories {
        nextToken
        startedAt
      }
    }
  }
`;
export const listAttributes = /* GraphQL */ `
  query ListAttributes(
    $filter: ModelAttributeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAttributes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAttributes = /* GraphQL */ `
  query SyncAttributes(
    $filter: ModelAttributeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttributes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSubCategory2 = /* GraphQL */ `
  query GetSubCategory2($id: ID!) {
    getSubCategory2(id: $id) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
      }
    }
  }
`;
export const listSubCategory2s = /* GraphQL */ `
  query ListSubCategory2s(
    $filter: ModelSubCategory2FilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategory2s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSubCategory2s = /* GraphQL */ `
  query SyncSubCategory2s(
    $filter: ModelSubCategory2FilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubCategory2s(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSubCategory = /* GraphQL */ `
  query GetSubCategory($id: ID!) {
    getSubCategory(id: $id) {
      id
      name
      categoryID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
      }
      attributes {
        nextToken
        startedAt
      }
    }
  }
`;
export const listSubCategorys = /* GraphQL */ `
  query ListSubCategorys(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        categoryID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSubCategories = /* GraphQL */ `
  query SyncSubCategories(
    $filter: ModelSubCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        categoryID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
      }
      SubCategories {
        nextToken
        startedAt
      }
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCategories = /* GraphQL */ `
  query SyncCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getBrand = /* GraphQL */ `
  query GetBrand($id: ID!) {
    getBrand(id: $id) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
      }
    }
  }
`;
export const listBrands = /* GraphQL */ `
  query ListBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBrands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncBrands = /* GraphQL */ `
  query SyncBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBrands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getManufacturer = /* GraphQL */ `
  query GetManufacturer($id: ID!) {
    getManufacturer(id: $id) {
      id
      name
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
      }
    }
  }
`;
export const listManufacturers = /* GraphQL */ `
  query ListManufacturers(
    $filter: ModelManufacturerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listManufacturers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncManufacturers = /* GraphQL */ `
  query SyncManufacturers(
    $filter: ModelManufacturerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncManufacturers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getEbayStoreCategory = /* GraphQL */ `
  query GetEbayStoreCategory($id: ID!) {
    getEbayStoreCategory(id: $id) {
      id
      name
      code
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Products {
        nextToken
        startedAt
      }
    }
  }
`;
export const listEbayStoreCategorys = /* GraphQL */ `
  query ListEbayStoreCategorys(
    $filter: ModelEbayStoreCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEbayStoreCategorys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        code
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEbayStoreCategories = /* GraphQL */ `
  query SyncEbayStoreCategories(
    $filter: ModelEbayStoreCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEbayStoreCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        code
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAttributeSubCategories = /* GraphQL */ `
  query SyncAttributeSubCategories(
    $filter: ModelAttributeSubCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAttributeSubCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        attributeID
        subcategoryID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
