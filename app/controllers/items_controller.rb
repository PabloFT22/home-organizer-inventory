class ItemsController < ApplicationController

    def index
        render json: Item.all
    end

    def create      
        new_item = Item.new( item_params ) 
        if new_item.save 
         render json: new_item
        else
         render json: { errors: new_item.errors.full_messages }         
        end 
    end

    # finish this ish
    def destroy
        item = Item.find_by_id(params[:id])
        item.destroy
        head :no_content
     
    end
    # 👍
    def update
        update_item =  Item.find_by_id(params[:id])
        if update_item
            update_item.update(item_params)
            render json: update_item
        else
            render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def item_params
        params.permit(:name, :user_id, :description, :image_url, :location_in_room, :location_id)
    end


end
