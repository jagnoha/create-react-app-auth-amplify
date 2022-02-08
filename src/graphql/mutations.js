/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createAttribute = /* GraphQL */ `
  mutation CreateAttribute(
    $input: CreateAttributeInput!
    $condition: ModelAttributeConditionInput
  ) {
    createAttribute(input: $input, condition: $condition) {
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
export const updateAttribute = /* GraphQL */ `
  mutation UpdateAttribute(
    $input: UpdateAttributeInput!
    $condition: ModelAttributeConditionInput
  ) {
    updateAttribute(input: $input, condition: $condition) {
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
export const deleteAttribute = /* GraphQL */ `
  mutation DeleteAttribute(
    $input: DeleteAttributeInput!
    $condition: ModelAttributeConditionInput
  ) {
    deleteAttribute(input: $input, condition: $condition) {
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
export const createSubCategory2 = /* GraphQL */ `
  mutation CreateSubCategory2(
    $input: CreateSubCategory2Input!
    $condition: ModelSubCategory2ConditionInput
  ) {
    createSubCategory2(input: $input, condition: $condition) {
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
export const updateSubCategory2 = /* GraphQL */ `
  mutation UpdateSubCategory2(
    $input: UpdateSubCategory2Input!
    $condition: ModelSubCategory2ConditionInput
  ) {
    updateSubCategory2(input: $input, condition: $condition) {
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
export const deleteSubCategory2 = /* GraphQL */ `
  mutation DeleteSubCategory2(
    $input: DeleteSubCategory2Input!
    $condition: ModelSubCategory2ConditionInput
  ) {
    deleteSubCategory2(input: $input, condition: $condition) {
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
export const createSubCategory = /* GraphQL */ `
  mutation CreateSubCategory(
    $input: CreateSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    createSubCategory(input: $input, condition: $condition) {
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
export const updateSubCategory = /* GraphQL */ `
  mutation UpdateSubCategory(
    $input: UpdateSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    updateSubCategory(input: $input, condition: $condition) {
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
export const deleteSubCategory = /* GraphQL */ `
  mutation DeleteSubCategory(
    $input: DeleteSubCategoryInput!
    $condition: ModelSubCategoryConditionInput
  ) {
    deleteSubCategory(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createBrand = /* GraphQL */ `
  mutation CreateBrand(
    $input: CreateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    createBrand(input: $input, condition: $condition) {
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
export const updateBrand = /* GraphQL */ `
  mutation UpdateBrand(
    $input: UpdateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    updateBrand(input: $input, condition: $condition) {
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
export const deleteBrand = /* GraphQL */ `
  mutation DeleteBrand(
    $input: DeleteBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    deleteBrand(input: $input, condition: $condition) {
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
export const createManufacturer = /* GraphQL */ `
  mutation CreateManufacturer(
    $input: CreateManufacturerInput!
    $condition: ModelManufacturerConditionInput
  ) {
    createManufacturer(input: $input, condition: $condition) {
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
export const updateManufacturer = /* GraphQL */ `
  mutation UpdateManufacturer(
    $input: UpdateManufacturerInput!
    $condition: ModelManufacturerConditionInput
  ) {
    updateManufacturer(input: $input, condition: $condition) {
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
export const deleteManufacturer = /* GraphQL */ `
  mutation DeleteManufacturer(
    $input: DeleteManufacturerInput!
    $condition: ModelManufacturerConditionInput
  ) {
    deleteManufacturer(input: $input, condition: $condition) {
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
export const createEbayStoreCategory = /* GraphQL */ `
  mutation CreateEbayStoreCategory(
    $input: CreateEbayStoreCategoryInput!
    $condition: ModelEbayStoreCategoryConditionInput
  ) {
    createEbayStoreCategory(input: $input, condition: $condition) {
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
export const updateEbayStoreCategory = /* GraphQL */ `
  mutation UpdateEbayStoreCategory(
    $input: UpdateEbayStoreCategoryInput!
    $condition: ModelEbayStoreCategoryConditionInput
  ) {
    updateEbayStoreCategory(input: $input, condition: $condition) {
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
export const deleteEbayStoreCategory = /* GraphQL */ `
  mutation DeleteEbayStoreCategory(
    $input: DeleteEbayStoreCategoryInput!
    $condition: ModelEbayStoreCategoryConditionInput
  ) {
    deleteEbayStoreCategory(input: $input, condition: $condition) {
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
export const createAttributeSubCategory = /* GraphQL */ `
  mutation CreateAttributeSubCategory(
    $input: CreateAttributeSubCategoryInput!
    $condition: ModelAttributeSubCategoryConditionInput
  ) {
    createAttributeSubCategory(input: $input, condition: $condition) {
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
export const updateAttributeSubCategory = /* GraphQL */ `
  mutation UpdateAttributeSubCategory(
    $input: UpdateAttributeSubCategoryInput!
    $condition: ModelAttributeSubCategoryConditionInput
  ) {
    updateAttributeSubCategory(input: $input, condition: $condition) {
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
export const deleteAttributeSubCategory = /* GraphQL */ `
  mutation DeleteAttributeSubCategory(
    $input: DeleteAttributeSubCategoryInput!
    $condition: ModelAttributeSubCategoryConditionInput
  ) {
    deleteAttributeSubCategory(input: $input, condition: $condition) {
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
