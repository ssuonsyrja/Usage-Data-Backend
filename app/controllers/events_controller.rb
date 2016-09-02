class EventsController < ApplicationController

  def index
    respond_with Event.all
  end

  def create
    old = Event.where event_type: params[:event][:event_type]
    if old == nil
      respond_with Event.create(event_params)
    else
      same_old = old.where target: params[:event][:target]
      if same_old == nil
        respond_with Event.create(event_params)
      else
        old_same_old = same_old.where host: params[:event][:host]
        if old_same_old == nil
          respond_with Event.create(event_params)
        else
          same_old_same_old = old_same_old.find_by widget: params[:event][:widget]
          if same_old_same_old == nil
            respond_with Event.create(event_params)
          else
            same_old_same_old.increment!(:count)
            respond_with same_old_same_old
          end
        end
      end
    end
  end

  def show
    respond_with Event.find(params[:id])
  end

  def upvote
    event = Event.find(params[:id])
    event.increment!(:count)

    respond_with event
  end

  private
  def event_params
    params.require(:event).permit(:event_type, :target, :count, :host, :widget)
  end
end
