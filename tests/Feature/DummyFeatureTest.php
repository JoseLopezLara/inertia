<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class DummyFeatureTest extends TestCase
{
    #[Test]
    public function it_runs_this_dummy_feature_test()
    {
        $this->assertTrue(true);
    }
}
