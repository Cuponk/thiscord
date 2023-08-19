class Api::ChannelsController < ApplicationController
    
    def index
        @channels = Channel.all
        render :index
    end

    def show
        @channel = Channel.find_by(id: params[:id])
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