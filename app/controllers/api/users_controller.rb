class Api::UsersController < ApplicationController

  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422 # unprocessable entity
    end
  end

  def index
    @users = User.all
    render :index
end

def show
    @user = User.find_by(id: params[:id])
end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
