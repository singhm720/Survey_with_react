class SurveysController < ApplicationController
  
  # def new
  #   @survey = Survey.new
  # end

  # def create
  #   @survey = Survey.new(survey_params)
  #   if @survey.save
  #     # render json: { id: @survey.id }, status: :created
  #     redirect_to edit_survey
  #   else
  #     render json: @survey.errors, status: :unprocessable_entity
  #   end
  # end

  # def edit
  # end

  # def update
  #   @survey = Survey.find(params[:id])
  #   if @survey.update(survey_params)
  #     render json: @survey, status: :ok
  #   else
  #     render json: @survey.errors, status: :unprocessable_entity
  #   end
  # end

  # def show
  #   @survey = Survey.find(params[:id])
  #   render json: @survey
  # end

  # def delete
  # end
  
  # private
  # def survey_params
  #   params.require(:survey).permit(:name, :description)
  # end
end
