class LocationsController < ApplicationController
    def index
        render json: Location.all
    end

    def show_items
        render json: Location.find(params[:id]).items
    end

    def create
        # byebug
        logged_in_user = User.find_by(id: session[:user_id])
        if logged_in_user
            new_location = logged_in_user.locations.build(location_create_params)
            if new_location.save
                render json: new_location
            else
                new_location.errors.full_messages
            end
        end
    end

    private

    def location_create_params
        params.permit(:name, :user_id)
    end
end
