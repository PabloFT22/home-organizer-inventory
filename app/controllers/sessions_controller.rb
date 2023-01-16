class SessionsController < ApplicationController 

include ActionController::Cookies
    
def create
    # def login

    user = User.find_by(email: params[:email])
    if user
      if user.authenticate(params[:password])
        session[:user_id] = user.id
        # render json: session[:user_id]
        render json: user
      else
        render json: { error: "Check your password" }, status: :unauthorized  # try diff error message 
      end
    else
      render json: { error: "User/Password Does'nt Match" }, status: :not_found
    end
end

def get_logged_in_user
    user = User.find_by(id: session[:user_id])
    render json: user
    # byebug

end

end
