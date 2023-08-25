class Api::MembershipsController < ApplicationController

    def show
        def show
            @membership = Membership.find(params[:id])
            if @membership
                render :show
            else
                render json: {error: 'Not Found'}, status: 404
            end
        end
    end

    def create
        @membership = Membership.new(membership_params)
        if @membership.save!
            render :show
        else
            render json: {error: 'Problem creating membership'}, status: 422
        end
    end

    def destroy

    end

    private 

    def membership_params
        params.require(:membership).permit(:membershipable_id, :membershipable_type, :user_id)
    end
end
