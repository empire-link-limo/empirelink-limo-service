import os
from pathlib import Path

def create_project_structure():
    # Root directory
    root = Path("empirelink-limo-service")
    root.mkdir(exist_ok=True)
    
    # Create README and .gitignore
    (root / "README.md").touch()
    (root / ".gitignore").touch()
    
    # Frontend structure
    frontend = root / "frontend"
    frontend.mkdir(exist_ok=True)
    
    # Frontend public directory
    public = frontend / "public"
    public.mkdir(exist_ok=True)
    (public / "favicon.ico").touch()
    
    public_images = public / "images"
    public_images.mkdir(exist_ok=True)
    (public_images / "logo.svg").touch()
    (public_images / "og-image.jpg").touch()
    
    vehicles = public_images / "vehicles"
    vehicles.mkdir(exist_ok=True)
    
    fonts = public / "fonts"
    fonts.mkdir(exist_ok=True)
    
    # Frontend src directory
    src = frontend / "src"
    src.mkdir(exist_ok=True)
    
    # Components
    components = src / "components"
    components.mkdir(exist_ok=True)
    
    # Layout components
    layout = components / "layout"
    layout.mkdir(exist_ok=True)
    for f in ["Layout.tsx", "Header.tsx", "Footer.tsx", "SEO.tsx"]:
        (layout / f).touch()
    
    # UI components
    ui = components / "ui"
    ui.mkdir(exist_ok=True)
    for f in ["Button.tsx", "Card.tsx", "Carousel.tsx", "Modal.tsx", 
              "ContactForm.tsx", "HorizontalScroller.tsx", "AnimatedSection.tsx"]:
        (ui / f).touch()
    
    # Page-specific components
    for section in ["home", "fleet", "services", "blog", "about", "booking", "shared"]:
        section_dir = components / section
        section_dir.mkdir(exist_ok=True)
        
        if section == "home":
            for f in ["HeroSection.tsx", "FeaturedVehicles.tsx", 
                     "ServiceHighlights.tsx", "TestimonialSlider.tsx"]:
                (section_dir / f).touch()
        elif section == "fleet":
            for f in ["VehicleGrid.tsx", "VehicleCard.tsx", 
                     "VehicleDetail.tsx", "VehicleGallery.tsx"]:
                (section_dir / f).touch()
        elif section == "services":
            for f in ["ServicesList.tsx", "ServiceDetail.tsx"]:
                (section_dir / f).touch()
        elif section == "blog":
            for f in ["BlogList.tsx", "BlogCard.tsx", 
                     "BlogPost.tsx", "BlogSidebar.tsx"]:
                (section_dir / f).touch()
        elif section == "about":
            for f in ["CompanyHistory.tsx", "TeamSection.tsx", "Values.tsx"]:
                (section_dir / f).touch()
        elif section == "booking":
            (section_dir / "BookingWrapper.tsx").touch()
        elif section == "shared":
            for f in ["Pagination.tsx", "LoadingSpinner.tsx", 
                     "ErrorBoundary.tsx", "ImageWithFallback.tsx"]:
                (section_dir / f).touch()
    
    # Other src directories
    for dir_name in ["hooks", "utils", "types", "styles", "pages"]:
        dir_path = src / dir_name
        dir_path.mkdir(exist_ok=True)
        
        if dir_name == "hooks":
            for f in ["useVehicles.ts", "useBlogPosts.ts", "useAnimation.ts"]:
                (dir_path / f).touch()
        elif dir_name == "utils":
            for f in ["api.ts", "formatters.ts", "seo.ts"]:
                (dir_path / f).touch()
        elif dir_name == "types":
            for f in ["vehicle.ts", "blog.ts", "service.ts", "category.ts"]:
                (dir_path / f).touch()
        elif dir_name == "styles":
            (dir_path / "globals.css").touch()
        elif dir_name == "pages":
            # Main pages
            for f in ["_app.tsx", "_document.tsx", "index.tsx", "about.tsx"]:
                (dir_path / f).touch()
            
            # Contact page
            contact = dir_path / "contact"
            contact.mkdir(exist_ok=True)
            (contact / "index.tsx").touch()
            
            # Fleet pages
            fleet = dir_path / "fleet"
            fleet.mkdir(exist_ok=True)
            (fleet / "index.tsx").touch()
            (fleet / "[slug].tsx").touch()
            
            # Services pages
            services = dir_path / "services"
            services.mkdir(exist_ok=True)
            (services / "index.tsx").touch()
            (services / "[slug].tsx").touch()
            
            # Blog pages
            blog = dir_path / "blog"
            blog.mkdir(exist_ok=True)
            (blog / "index.tsx").touch()
            (blog / "[slug].tsx").touch()
            
            # Booking page
            booking = dir_path / "booking"
            booking.mkdir(exist_ok=True)
            (booking / "index.tsx").touch()
            
            # Sitemap
            sitemap = dir_path / "server-sitemap.xml"
            sitemap.mkdir(exist_ok=True)
            (sitemap / "index.tsx").touch()
    
    # Frontend config files
    for f in [".env.local", ".env.production", ".gitignore", 
              "next.config.js", "tailwind.config.js", 
              "postcss.config.js", "tsconfig.json", 
              "next-sitemap.config.js", "server.js", "package.json"]:
        (frontend / f).touch()
    
    # Backend structure
    backend = root / "backend"
    backend.mkdir(exist_ok=True)
    
    # Backend config
    config = backend / "config"
    config.mkdir(exist_ok=True)
    for f in ["admin.js", "api.js", "database.js", 
              "middleware.js", "plugins.js", "server.js"]:
        (config / f).touch()
    
    # Backend public
    backend_public = backend / "public"
    backend_public.mkdir(exist_ok=True)
    uploads = backend_public / "uploads"
    uploads.mkdir(exist_ok=True)
    
    # Backend src
    backend_src = backend / "src"
    backend_src.mkdir(exist_ok=True)
    
    # Admin customization
    (backend_src / "admin").mkdir(exist_ok=True)
    
    # API content types
    api = backend_src / "api"
    api.mkdir(exist_ok=True)
    
    for content_type in ["vehicle", "article", "service", "category", "tag", "author", "contact"]:
        ct_dir = api / content_type
        ct_dir.mkdir(exist_ok=True)
        
        if content_type == "vehicle":
            # Vehicle content type structure
            content_types = ct_dir / "content-types" / "vehicle"
            content_types.mkdir(parents=True, exist_ok=True)
            (content_types / "schema.json").touch()
            
            for sub_dir in ["controllers", "routes", "services"]:
                (ct_dir / sub_dir).mkdir(exist_ok=True)
    
    # Components
    backend_components = backend_src / "components"
    backend_components.mkdir(exist_ok=True)
    
    shared = backend_components / "shared"
    shared.mkdir(exist_ok=True)
    (shared / "seo.json").touch()
    
    details = backend_components / "details"
    details.mkdir(exist_ok=True)
    for f in ["feature.json", "technical-specifications.json", "spec-item.json"]:
        (details / f).touch()
    
    # Extensions
    (backend_src / "extensions").mkdir(exist_ok=True)
    (backend_src / "index.js").touch()
    
    # Backend config files
    for f in [".env", ".gitignore", "server.js", "package.json"]:
        (backend / f).touch()

if __name__ == "__main__":
    create_project_structure()
    print("Project structure created successfully!")