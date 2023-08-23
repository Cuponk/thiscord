class Api::ChannelsController < ApplicationController
    before_action :set_server
    
    def index
        if params[:server_id].present?
            @channels = @server.channels
        else
            @channels = Channel.all
        end
        render :index
    end

    def show
        @channel = Channel.find_by(id: params[:id])
        if @channel
            render :show
        else
            render json: { error: "Channel not found" }, status: :not_found
        end
    end
    

    def create
        @channel = @server.channels.build(channel_params)
        if @channel.save
            render :show
        else
            render json: @channel.errors.full_messages, status: :unprocessable_entity
        end
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

    def set_server
        @server = Server.find_by(id: params[:server_id])
    end
    
    def channel_params
        params.require(:channel).permit(:name, :server_id)
    end
end