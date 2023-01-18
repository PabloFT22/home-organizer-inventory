Rails.application.routes.draw do
  
  resources :item_categories
  resources :items
  resources :categories
  resources :locations

  # resources :users, except: :index
  resources :users

  # Custom user route- not RESTful
  get "/fresh_bath_of_user_locations", to: "users#my_locations"

  # get "/users", to: "users#index"
  # get "/users/:id", to: "users#show" 
  # post "/users", to: "users#create"
  # patch "/users/:id", to: "users#update"
  # delete "/users/:id", to: "users#destroy"

  # post "/login", to: "application#login"
  post "/login", to: "sessions#create"
  get "/userInSession", to: "sessions#get_logged_in_user"
  delete "/logout", to: "sessions#destroy"



  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }  # what is this doing??
end
