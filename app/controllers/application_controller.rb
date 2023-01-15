class ApplicationController < ActionController::API
  include ActionController::Cookies

  def login

    byebug

    user = User.find_by(email: params[:email])
    if user
      if user.authenticate(params[:password])
        render json: user
      else
        render json: { error: "Check your password" }, status: :unauthorized  # try diff error message 
      end
    else
      render json: { error: "User/Password Does'nt Match" }, status: :not_found
    end
  end

end
