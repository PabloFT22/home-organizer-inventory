class Item < ApplicationRecord
  
  belongs_to :user
  belongs_to :location

  has_many :item_categories
  has_many :categories, through: :item_categories
end
