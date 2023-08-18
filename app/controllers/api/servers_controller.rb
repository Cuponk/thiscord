class Api::ServersController < ApplicationController

    def index
        @servers = Server.all
        render :index
    end

    def show
        @server = Server.find_by(id: params[:id])
        render :show
    end

    def create
        @server = Server.create(server_params)
        render :show
    end

    def update
        @server = Server.find_by(id: params[:id])
        if @server.update(server_params)
            render :show
        end
    end

    private

    def server_params
        params.require(:server).permit(:name, :photo, :owner_id)
    end

end
