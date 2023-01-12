class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :location_in_room
  has_one :user
  has_one :location
end
