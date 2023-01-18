class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :user_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_response

# dry up this code

def index
    render json: User.all
end

def show
    user = User.find_by!(id: params[:id])
    render json: user
end

def create
    new_user = User.create!(user_params)
    render json: new_user, status: :created
end

# seems as though i shouldnt need this if using rescues? 
def update
    find_user = User.find_by(id: params[:id])
    if find_user
        if find_user.update(user_params)
            render json: find_user
        else
            render json: {errors: find_user.errors.full_messages}
        end
    else
        user_not_found
    end
end

def destroy
    user = User.find_by!(id: params[:id])
    user.destroy
    head :no_content
end

# custom controller action

def my_locations
    logged_in_user = User.find_by(id: session[:user_id])
    render json: logged_in_user.locations
end


private

def user_params
    # with wrap params
    params.permit(:name, :email, :address, :password) 
    #  disabled wrap params
    # params.require(:user).permit(:name, :email, :address, :password)
end

def user_not_found
    render json: {error: "User not found"}
end

def render_invalid_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
end

end
