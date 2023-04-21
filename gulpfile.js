const gulp = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {
	browserSync({
		server: {
			baseDir: 'docs',
			port: 3000,
		},
	});

	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('styles', function () {
	return gulp
		.src('src/sass/**/*.+(scss|sass)')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('docs/css'))
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
	return gulp
		.src('src/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('docs/'));
});

gulp.task('scripts', function () {
	return gulp
		.src('src/js/**/*.js')
		.pipe(concat('script.js'))
		.pipe(minify())
		.pipe(gulp.dest('docs/js'))
		.pipe(browserSync.stream());
});

gulp.task('json', function () {
	return gulp
		.src('src/languages/**/*')
		.pipe(gulp.dest('docs/languages'))
		.pipe(browserSync.stream());
})

gulp.task('fonts', function () {
	return gulp
		.src('src/fonts/**/*')
		.pipe(gulp.dest('docs/fonts'))
		.pipe(browserSync.stream());
});

gulp.task('icons', function () {
	return gulp
		.src('src/icons/**/*')
		.pipe(gulp.dest('docs/icons'))
		.pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp
		.src('src/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('docs/img'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch('src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
	gulp.watch('src/*.html', gulp.parallel('html'));
	gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
	gulp.watch('src/fonts/**/*').on('change', gulp.parallel('fonts'));
	gulp.watch('src/icons/**/*').on('change', gulp.parallel('icons'));
	gulp.watch('src/img/**/*').on('change', gulp.parallel('images'));
	gulp.watch('src/languages/**/*', gulp.parallel('json'));
});

gulp.task(
	'default',
	gulp.parallel(
		'watch',
		'json',
		'server',
		'styles',
		'scripts',
		'fonts',
		'icons',
		'html',
		'images'
	)
);
