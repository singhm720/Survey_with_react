class Api::V1::SurveysController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    @surveys = Survey.all
    render json: @surveys, status: :ok
  end

  def create
        @survey = Survey.new(survey_params)
        if @survey.save
          render json: { id: @survey.id, des: @survey.description }, status: :created
        else
          render json: @survey.errors, status: :unprocessable_entity
        end
  end

    def show
      @survey = Survey.find_by(id: params[:id])
        render json: @survey, status: :ok
    end

    def edit
    end

    def update
      @survey = Survey.find_by(id: params[:id])
      if @survey
        if @survey.update(survey_params)
          render json: @survey, status: :ok
        else
          render json: @survey.errors, status: :unprocessable_entity
        end
      else
        render json: { error: "Survey not found" }, status: :not_found
      end
    end
private
  def survey_params
    params.require(:survey).permit(:name, :description)
  end
end