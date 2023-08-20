class Api::ChannelsController < ApplicationController
    
    def index
        if params[:server_id].present?
            @channels = Channel.where(server_id: params[:server_id])
        else
            @channels = Channel.all
        end
        render :index
    end

    def show
        @channel = Channel.find_by(id: params[:id])
        render :show
    end

    def create
        @channel = Channel.create(channel_params)
        render :show
    end

    def update
        @channel = Channel.find_by(id: params[:id])
        if @channel.update(channel_params)
            render :show
        end
    end

    def destroy
        @channel = Channel.find_by(id: params[:id])
        @channel.destroy
        render :show
    end

    private

    def channel_params
        params.require(:channel).permit(:name, :server_id)
    end
end