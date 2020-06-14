<?php

namespace WaterAdmin\Antd;

use Illuminate\Support\ServiceProvider;
use WaterAdmin\Water;

class WaterAntdServiceProvider extends ServiceProvider
{
    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        Water::pluginRoutes(__DIR__.'/../routes/water-antd.php');
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
