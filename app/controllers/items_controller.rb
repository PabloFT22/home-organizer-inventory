class ItemsController < ApplicationController

    def index
        render json: Item.all
    end

    def create      
        new_item = Item.new( item_create_params ) 
        if new_item.save 
         render json: new_item
        else
         render json: { errors: new_item.errors.full_messages }         
        end 
    end

    private

    def item_create_params
        params.permit(:name, :user_id, :description, :image_url, :location_in_room, :location_id)
    end


end
