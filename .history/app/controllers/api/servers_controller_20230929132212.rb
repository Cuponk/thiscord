class Api::ServersController < ApplicationController

    def index
        if params[:user_id]
            @servers = Server.joins(:users).where("users.id = #{params[:user_id]}")
        else
            @servers = Server.all
        end
        render :index
    end

    def show
        @server = Server.find_by(id: params[:id])
        render :show
    end

    def create
        @server = Server.create(server_params)
        if @server.save
            Membership.create(user_id: current_user.id, membershipable_id: @server.id, membershipable_type: "Server")
            Channel.create(name: "general", server_id: @server.id)
            render :show
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        if @server.update(server_params)
            render :show
        end
    end

    def destroy
        @server = Server.find_by(id: params[:id])
        @server.destroy
        render :show
    end

    private

    def server_params
        params.require(:server).permit(:name, :photo, :owner_id)
    end

end
