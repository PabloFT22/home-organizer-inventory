class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :address, :locations

  has_many :locations
  has_many :items

  # def locations
  #   object.locations.map{|location|
  #     {
  #       id: location.id,
  #       name: location.name,
  #       items: location.items
  #     }
  #   }
  # end

end
