/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateAttribute = /* GraphQL */ `
  subscription OnCreateAttribute {
    onCreateAttribute {
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
export const onUpdateAttribute = /* GraphQL */ `
  subscription OnUpdateAttribute {
    onUpdateAttribute {
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
export const onDeleteAttribute = /* GraphQL */ `
  subscription OnDeleteAttribute {
    onDeleteAttribute {
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
export const onCreateSubCategory2 = /* GraphQL */ `
  subscription OnCreateSubCategory2 {
    onCreateSubCategory2 {
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
export const onUpdateSubCategory2 = /* GraphQL */ `
  subscription OnUpdateSubCategory2 {
    onUpdateSubCategory2 {
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
export const onDeleteSubCategory2 = /* GraphQL */ `
  subscription OnDeleteSubCategory2 {
    onDeleteSubCategory2 {
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
export const onCreateSubCategory = /* GraphQL */ `
  subscription OnCreateSubCategory {
    onCreateSubCategory {
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
export const onUpdateSubCategory = /* GraphQL */ `
  subscription OnUpdateSubCategory {
    onUpdateSubCategory {
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
export const onDeleteSubCategory = /* GraphQL */ `
  subscription OnDeleteSubCategory {
    onDeleteSubCategory {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateBrand = /* GraphQL */ `
  subscription OnCreateBrand {
    onCreateBrand {
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
export const onUpdateBrand = /* GraphQL */ `
  subscription OnUpdateBrand {
    onUpdateBrand {
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
export const onDeleteBrand = /* GraphQL */ `
  subscription OnDeleteBrand {
    onDeleteBrand {
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
export const onCreateManufacturer = /* GraphQL */ `
  subscription OnCreateManufacturer {
    onCreateManufacturer {
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
export const onUpdateManufacturer = /* GraphQL */ `
  subscription OnUpdateManufacturer {
    onUpdateManufacturer {
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
export const onDeleteManufacturer = /* GraphQL */ `
  subscription OnDeleteManufacturer {
    onDeleteManufacturer {
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
export const onCreateEbayStoreCategory = /* GraphQL */ `
  subscription OnCreateEbayStoreCategory {
    onCreateEbayStoreCategory {
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
export const onUpdateEbayStoreCategory = /* GraphQL */ `
  subscription OnUpdateEbayStoreCategory {
    onUpdateEbayStoreCategory {
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
export const onDeleteEbayStoreCategory = /* GraphQL */ `
  subscription OnDeleteEbayStoreCategory {
    onDeleteEbayStoreCategory {
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
export const onCreateAttributeSubCategory = /* GraphQL */ `
  subscription OnCreateAttributeSubCategory {
    onCreateAttributeSubCategory {
      id
      attributeID
      subcategoryID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      attribute {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      subcategory {
        id
        name
        categoryID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateAttributeSubCategory = /* GraphQL */ `
  subscription OnUpdateAttributeSubCategory {
    onUpdateAttributeSubCategory {
      id
      attributeID
      subcategoryID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      attribute {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      subcategory {
        id
        name
        categoryID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteAttributeSubCategory = /* GraphQL */ `
  subscription OnDeleteAttributeSubCategory {
    onDeleteAttributeSubCategory {
      id
      attributeID
      subcategoryID
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      attribute {
        id
        name
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      subcategory {
        id
        name
        categoryID
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
    }
  }
`;
