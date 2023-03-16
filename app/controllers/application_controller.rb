class ApplicationController < ActionController::API
  
  include ActionController::Cookies

  before_action :authorized_user

  def authorized_user
    unless User.find_by(id: session[:user_id])
      render json: {error: 'Not Authorized'}, status: :unauthorized
    end
  end

end
