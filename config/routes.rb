Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :servers, only: [:index, :show, :create, :update, :destroy] do
      resources :channels, only: [:index, :show, :create, :update, :destroy]
    end
  end

  get '*path', to: 'static_pages#frontend', constraints: lambda { |req| !req.xhr? && req.format.html?}

  root to: "static_pages#frontend"
end