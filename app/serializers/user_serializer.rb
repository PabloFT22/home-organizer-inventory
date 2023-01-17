class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :address # , :password_digest

  has_many :locations
  has_many :items
end
