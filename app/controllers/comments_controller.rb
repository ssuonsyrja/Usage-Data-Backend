class CommentsController < ApplicationController

  def create
    event = Event.find(params[:event_id])
    comment = event.comments.create(comment_params)

    # We respond with both event and comments in
    # CommentsController because we are using a nested
    # resource, although only the last object is returned
    # when responding to json.
    respond_with event, comment
  end

  def upvote
    event = Event.find(params[:event_id])
    comment = event.comments.find(params[:id])
    comment.increment!(:upvotes)

    respond_with event #, comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :upvotes)
  end

end
