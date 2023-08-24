class Api::MessagesController < ApplicationController

    before_action :set_channel, only: [:create]

    def index
        # @channel = Channel.find(params[:channel_id])

        # @messages = @channel.messages
        @messages = Message.where(channel_id: params[:channel_id])
        render :index
    end

    def show
        @messages = Message.find_by(id: params[:id])
        render :show
    end

    def create
        @message = Message.new(message_params)
        if @message.save
            render :show
        else
            render json: @message.errors.full_messages, status: 422
        end
    end

    def update
        @message = Message.find_by(id: params[:id])
        if @message.update(message_params)
            render :show
        end
    end

    def destroy
        @message = Message.find_by(id: params[:id])
        @message.destroy
        render :show
    end

    private

    def set_channel
        @channel = Channel.find_by(id: params[:channel_id])
    end

    def message_params
        params.require(:message).permit(:body, :author_id, :channel_id)
    end
end