class User < ApplicationRecord
   
    has_many :locations
    has_many :items

    has_secure_password

    validates :name, presence: true

end
