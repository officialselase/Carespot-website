"""
API views for content management.
"""

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.db.models import Q, Count
from django.utils import timezone

from authentication.permissions import IsOwnerOrReadOnly, HasRolePermission
from .models import Category, Tag, BlogPost, Project, TeamMember, Event, Document, ApprovalWorkflow, ContentRevision
from .serializers import (
    CategorySerializer, TagSerializer, BlogPostListSerializer,
    BlogPostDetailSerializer, ProjectListSerializer, ProjectDetailSerializer,
    TeamMemberSerializer, EventListSerializer, EventDetailSerializer,
    DocumentSerializer
)


class CategoryListView(generics.ListCreateAPIView):
    """
    List all categories or create a new category.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by parent category
        parent = self.request.query_params.get('parent')
        if parent:
            if parent == 'null':
                queryset = queryset.filter(parent__isnull=True)
            else:
                queryset = queryset.filter(parent__slug=parent)
        
        return queryset.order_by('name')


class TagListView(generics.ListCreateAPIView):
    """
    List all tags or create a new tag.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Search tags
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        return queryset.order_by('name')


class BlogPostListView(generics.ListCreateAPIView):
    """
    List all blog posts or create a new post.
    """
    serializer_class = BlogPostListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogPostDetailSerializer
        return BlogPostListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = BlogPost.objects.all()
        
        # Only show published posts to non-staff users
        if not self.request.user.is_authenticated or not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(
                status='published',
                published_at__lte=timezone.now()
            )
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by tag
        tag = self.request.query_params.get('tag')
        if tag:
            queryset = queryset.filter(tags__slug=tag)
        
        # Filter by author
        author = self.request.query_params.get('author')
        if author:
            queryset = queryset.filter(author__id=author)
        
        # Filter featured posts
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(excerpt__icontains=search) |
                Q(content__icontains=search)
            )
        
        return queryset.order_by('-published_at', '-created_at')
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class BlogPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a blog post.
    """
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Only show published posts to non-staff users
        if not self.request.user.is_authenticated or not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(
                status='published',
                published_at__lte=timezone.now()
            )
        
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        """Increment view count when retrieving post details."""
        instance = self.get_object()
        instance.view_count += 1
        instance.save(update_fields=['view_count'])
        return super().retrieve(request, *args, **kwargs)


class ProjectListView(generics.ListCreateAPIView):
    """
    List all projects or create a new project.
    """
    serializer_class = ProjectListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return ProjectDetailSerializer
        return ProjectListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = Project.objects.all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by location
        location = self.request.query_params.get('location')
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        # Filter featured projects
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(location__icontains=search)
            )
        
        return queryset.order_by('-start_date')


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a project.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]


class TeamMemberListView(generics.ListCreateAPIView):
    """
    List all team members or create a new member.
    """
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = TeamMember.objects.filter(is_active=True)
        
        # Filter by role
        role = self.request.query_params.get('role')
        if role:
            queryset = queryset.filter(role=role)
        
        # Filter by show_on_website
        show_on_website = self.request.query_params.get('show_on_website')
        if show_on_website == 'true':
            queryset = queryset.filter(show_on_website=True)
        
        return queryset.order_by('display_order', 'name')


class EventListView(generics.ListCreateAPIView):
    """
    List all events or create a new event.
    """
    serializer_class = EventListSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventDetailSerializer
        return EventListSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = Event.objects.all()
        
        # Filter by status
        status_filter = self.request.query_params.get('status')
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by event type
        event_type = self.request.query_params.get('event_type')
        if event_type:
            queryset = queryset.filter(event_type=event_type)
        
        # Filter upcoming events
        upcoming = self.request.query_params.get('upcoming')
        if upcoming == 'true':
            queryset = queryset.filter(
                start_datetime__gte=timezone.now(),
                status='upcoming'
            )
        
        # Filter by virtual/in-person
        is_virtual = self.request.query_params.get('is_virtual')
        if is_virtual == 'true':
            queryset = queryset.filter(is_virtual=True)
        elif is_virtual == 'false':
            queryset = queryset.filter(is_virtual=False)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(location_name__icontains=search)
            )
        
        return queryset.order_by('start_datetime')
    
    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)


class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete an event.
    """
    queryset = Event.objects.all()
    serializer_class = EventDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]


class DocumentListView(generics.ListCreateAPIView):
    """
    List all documents or upload a new document.
    """
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [HasRolePermission(['admin', 'staff'])]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        queryset = Document.objects.all()
        
        # Filter by access level based on user permissions
        if not self.request.user.is_authenticated:
            queryset = queryset.filter(access_level='public')
        elif not self.request.user.has_role(['admin', 'staff']):
            queryset = queryset.filter(access_level__in=['public', 'members'])
        
        # Filter by document type
        doc_type = self.request.query_params.get('document_type')
        if doc_type:
            queryset = queryset.filter(document_type=doc_type)
        
        # Filter by category
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )
        
        return queryset.order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def increment_blog_share(request, slug):
    """
    Increment share count for a blog post.
    """
    try:
        post = BlogPost.objects.get(slug=slug)
        post.share_count += 1
        post.save(update_fields=['share_count'])
        return Response({'status': 'success', 'share_count': post.share_count})
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def increment_document_download(request, pk):
    """
    Increment download count for a document.
    """
    try:
        document = Document.objects.get(pk=pk)
        
        # Check access permissions
        if document.access_level == 'members' and not request.user.is_authenticated:
            return Response(
                {'error': 'Authentication required'},
                status=status.HTTP_401_UNAUTHORIZED
            )
        elif document.access_level in ['staff', 'admin'] and not request.user.has_role(['admin', 'staff']):
            return Response(
                {'error': 'Insufficient permissions'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        document.download_count += 1
        document.save(update_fields=['download_count'])
        return Response({'status': 'success', 'download_count': document.download_count})
    except Document.DoesNotExist:
        return Response(
            {'error': 'Document not found'},
            status=status.HTTP_404_NOT_FOUND
        )


# Approval Workflow Views

@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def submit_blog_post_for_review(request, slug):
    """Submit a blog post for review."""
    try:
        post = BlogPost.objects.get(slug=slug)
        
        # Check if user can submit this post
        if post.author != request.user and not request.user.has_role(['admin']):
            return Response(
                {'error': 'You can only submit your own posts for review'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if post.submit_for_review(request.user, request):
            return Response({'status': 'success', 'message': 'Post submitted for review'})
        else:
            return Response(
                {'error': 'Post cannot be submitted for review in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def start_blog_post_review(request, slug):
    """Start reviewing a blog post."""
    try:
        post = BlogPost.objects.get(slug=slug)
        
        if post.start_review(request.user, request):
            return Response({'status': 'success', 'message': 'Review started'})
        else:
            return Response(
                {'error': 'Post cannot be reviewed in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def approve_blog_post(request, slug):
    """Approve a blog post."""
    try:
        post = BlogPost.objects.get(slug=slug)
        notes = request.data.get('notes', '')
        
        if post.approve(request.user, notes, request):
            return Response({'status': 'success', 'message': 'Post approved'})
        else:
            return Response(
                {'error': 'Post cannot be approved in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def reject_blog_post(request, slug):
    """Reject a blog post."""
    try:
        post = BlogPost.objects.get(slug=slug)
        reason = request.data.get('reason', '')
        
        if post.reject(request.user, reason, request):
            return Response({'status': 'success', 'message': 'Post rejected'})
        else:
            return Response(
                {'error': 'Post cannot be rejected in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def publish_blog_post(request, slug):
    """Publish an approved blog post."""
    try:
        post = BlogPost.objects.get(slug=slug)
        
        if post.publish(request.user, request):
            return Response({'status': 'success', 'message': 'Post published'})
        else:
            return Response(
                {'error': 'Post cannot be published in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except BlogPost.DoesNotExist:
        return Response(
            {'error': 'Blog post not found'},
            status=status.HTTP_404_NOT_FOUND
        )


# Project Approval Workflow Views

@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def submit_project_for_review(request, slug):
    """Submit a project for review."""
    try:
        project = Project.objects.get(slug=slug)
        
        # Check if user can submit this project
        if project.created_by != request.user and not request.user.has_role(['admin']):
            return Response(
                {'error': 'You can only submit your own projects for review'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if project.submit_for_review(request.user, request):
            return Response({'status': 'success', 'message': 'Project submitted for review'})
        else:
            return Response(
                {'error': 'Project cannot be submitted for review in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Project.DoesNotExist:
        return Response(
            {'error': 'Project not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def approve_project(request, slug):
    """Approve a project."""
    try:
        project = Project.objects.get(slug=slug)
        notes = request.data.get('notes', '')
        
        if project.approve(request.user, notes, request):
            return Response({'status': 'success', 'message': 'Project approved'})
        else:
            return Response(
                {'error': 'Project cannot be approved in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Project.DoesNotExist:
        return Response(
            {'error': 'Project not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def activate_project(request, slug):
    """Activate an approved project."""
    try:
        project = Project.objects.get(slug=slug)
        
        if project.activate(request.user, request):
            return Response({'status': 'success', 'message': 'Project activated'})
        else:
            return Response(
                {'error': 'Project cannot be activated in its current state'},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Project.DoesNotExist:
        return Response(
            {'error': 'Project not found'},
            status=status.HTTP_404_NOT_FOUND
        )


# Workflow History Views

@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def get_content_workflow_history(request, content_type, object_id):
    """Get workflow history for a content object."""
    from django.contrib.contenttypes.models import ContentType
    
    try:
        ct = ContentType.objects.get(model=content_type)
        workflows = ApprovalWorkflow.objects.filter(
            content_type=ct,
            object_id=object_id
        ).select_related('actor')
        
        history = []
        for workflow in workflows:
            history.append({
                'action': workflow.get_action_display(),
                'actor': workflow.actor.get_full_name() or workflow.actor.email,
                'notes': workflow.notes,
                'timestamp': workflow.created_at,
                'ip_address': workflow.ip_address
            })
        
        return Response({'history': history})
    except ContentType.DoesNotExist:
        return Response(
            {'error': 'Invalid content type'},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['GET'])
@permission_classes([HasRolePermission(['admin', 'staff'])])
def get_pending_approvals(request):
    """Get all content items pending approval."""
    # Get blog posts pending approval
    pending_posts = BlogPost.objects.filter(
        status__in=['submitted', 'review']
    ).select_related('author', 'category')
    
    # Get projects pending approval
    pending_projects = Project.objects.filter(
        status__in=['submitted', 'review']
    ).select_related('created_by', 'category')
    
    data = {
        'blog_posts': [{
            'id': post.id,
            'title': post.title,
            'slug': post.slug,
            'author': post.author.get_full_name() or post.author.email,
            'status': post.get_status_display(),
            'submitted_at': post.submitted_at,
            'category': post.category.name if post.category else None
        } for post in pending_posts],
        
        'projects': [{
            'id': project.id,
            'title': project.title,
            'slug': project.slug,
            'created_by': project.created_by.get_full_name() or project.created_by.email,
            'status': project.get_status_display(),
            'submitted_at': project.submitted_at,
            'category': project.category.name if project.category else None
        } for project in pending_projects]
    }
    
    return Response(data)