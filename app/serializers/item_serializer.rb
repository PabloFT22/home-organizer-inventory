class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image_url, :location_in_room, :location_id
  has_one :user
  has_one :location
end
