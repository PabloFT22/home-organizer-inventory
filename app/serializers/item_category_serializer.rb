class ItemCategorySerializer < ActiveModel::Serializer
  attributes :id
  has_one :item
  has_one :category
end
