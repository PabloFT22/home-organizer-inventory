class CategoriesController < ApplicationController

  def index
    render json: Category.all
  end

end
