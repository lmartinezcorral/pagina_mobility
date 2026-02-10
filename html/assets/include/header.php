<?php
/**
 * Barra de menú dinámica — Un solo archivo para todo el sitio.
 * Definir $header_variant antes del include: 'home' (index) o 'inner' (resto).
 */
$current_page = basename($_SERVER['PHP_SELF'] ?? 'index.html');
$current_base = pathinfo($current_page, PATHINFO_FILENAME);
$header_variant = $header_variant ?? 'inner';

$is_home = ($header_variant === 'home');
$header_class = $is_home ? 'navbar-sticky navbar-transparent navbar-primary' : 'header-static navbar-sticky navbar-light';
$logo_src = $is_home ? 'assets/images/logo-white.svg' : 'assets/images/logos_mobility/isologo_clr.png';
$logo_alt = 'Somos Mobility';

$is_servicios = in_array($current_base, ['fisioterapia', 'terapia-fisica-domicilio', 'masajes', 'fisioterapia-ortopedica', 'fisioterapia-neurologica', 'fisioterapia-deportiva', 'fisioterapia-geriatrica', 'terapia-ocupacional'], true);
$is_capacitaciones = ($current_base === 'capacitaciones');
$is_blog = ($current_base === 'blog');
$is_nosotros = in_array($current_base, ['sobre-nosotros', 'nuestra_historia', 'team', 'contact', 'faq'], true);
?>
<header class="<?php echo htmlspecialchars($header_class); ?>">
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">
                <img class="navbar-brand-item" src="<?php echo htmlspecialchars($logo_src); ?>" alt="<?php echo htmlspecialchars($logo_alt); ?>">
            </a>
            <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav navbar-nav-scroll navbar-nav-scroll ms-auto">
                    <li class="nav-item dropdown<?php echo $is_servicios ? ' active' : ''; ?>">
                        <a class="nav-link dropdown-toggle" href="#" id="demosMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">SERVICIOS</a>
                        <div class="dropdown-menu pb-3 pb-lg-0 dropdown-menu-end" aria-labelledby="demosMenu">
                            <div class="d-block d-sm-flex">
                                <ul class="list-unstyled w-100 w-sm-30 pe-0 pe-lg-2">
                                    <li><a class="dropdown-item" href="fisioterapia.html">Fisioterapia</a></li>
                                    <li><a class="dropdown-item" href="terapia-fisica-domicilio.html">Terapia Física a Domicilio</a></li>
                                    <li><a class="dropdown-item" href="masajes.html">Masajes</a></li>
                                </ul>
                            </div>
                            <div class="w-100 bg-grad pattern-overlay-2 p-4 mt-3 all-text-white d-none d-lg-flex">
                                <div class="align-self-center me-4">
                                    <h4 class="mb-0">SOMOS MOBILITY</h4>
                                    <p class="mb-0 small">¡Vive la Vida en Movimiento!</p>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item<?php echo $is_capacitaciones ? ' active' : ''; ?>">
                        <a class="nav-link" href="capacitaciones.html">CAPACITACIONES</a>
                    </li>
                    <li class="nav-item<?php echo $is_blog ? ' active' : ''; ?>">
                        <a class="nav-link" href="blog.html">BLOG</a>
                    </li>
                    <li class="nav-item dropdown<?php echo $is_nosotros ? ' active' : ''; ?>">
                        <a class="nav-link dropdown-toggle" href="#" id="docMenu" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">NOSOTROS</a>
                        <ul class="dropdown-menu" aria-labelledby="docMenu">
                            <li><a class="dropdown-item" href="sobre-nosotros.html">¿QUIÉNES SOMOS?</a></li>
                            <li><a class="dropdown-item" href="team.html">Equipo</a></li>
                            <li><a class="dropdown-item" href="contact.html">Contacto</a></li>
                            <li><a class="dropdown-item" href="faq.html">FAQs</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
