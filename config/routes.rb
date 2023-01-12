Rails.application.routes.draw do
  
  resources :item_categories
  resources :items
  resources :categories
  resources :locations
  resources :users

  # get to /users user#index

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }  # what is this doing??
end
