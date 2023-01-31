class Item < ApplicationRecord
  
  belongs_to :user
  belongs_to :location

  has_many :item_categories
  has_many :categories, through: :item_categories

  # def set_current_user
  #   @current_user = current_user
  #   end

  # def assign_to_user(user)
  #   self.user = user
  #   self.save
  # end

  # def self.alphabetize
  #   reorder(:name)
  # end
end
