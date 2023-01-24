class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :address, :location_names, :password_digest

  has_many :locations
  has_many :items

  def location_names
    object.locations.map do |location|
      { 
        name: location.name
      }
    end
  end

end
