# config/routes.rb
Rails.application.routes.draw do
  root 'surveys#new'

  namespace :api do
    namespace :v1 do
      resources :surveys, only: [:create, :update, :destroy, :show, :index, :edit]
    end
  end
  # Route all other requests to React frontend
  get '*path', to: 'surveys#edit', constraints: ->(req) { !req.xhr? && req.format.html? }

end
