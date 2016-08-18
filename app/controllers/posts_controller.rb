class PostsController < ApplicationController

  def index
    respond_with Post.all
  end

  def create
    old = Post.where event_type: params[:event_type]
    if old == nil
      respond_with Post.create(post_params)
    else
      same_old = old.where target: params[:target]
      if same_old == nil
        respond_with Post.create(post_params)
      else
        old_same_old = same_old.where host: params[:host]
        if old_same_old == nil
          respond_with Post.create(post_params)
        else
          same_old_same_old = old_same_old.find_by widget: params[:widget]
          if same_old_same_old == nil
            respond_with Post.create(post_params)
          else
            same_old_same_old.increment!(:count)
            respond_with same_old_same_old
          end
        end
      end
    end
  end

  def show
    respond_with Post.find(params[:id])
  end

  def upvote
    post = Post.find(params[:id])
    post.increment!(:count)

    respond_with post
  end

  private
  def post_params
    params.require(:post).permit(:event_type, :target, :count, :host, :widget)
  end
end
