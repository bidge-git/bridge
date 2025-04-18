import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  // GCard,
  GCardTitle,
  // GCardContent,
}from "@/components/ui/greeting-card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/greeting-card col-span-full md:col-span-full xl:col-span-3">
        <CardHeader>
          <GCardTitle className="text-5xl md:text-6xl xl:text-8xl font-semibold rectangular-nums">
          Good Morning, Arjun.
          </GCardTitle>
          <CardAction>
            {/* <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge> */}
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Check out events happening on campus!
          </div>
          {/* <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div> */}
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Data Structures and Algorithms</CardDescription>
          <CardTitle className="text-xl md:text-2xl font-semibold tabular-nums">
           COMP2123
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="px-1.5 py-0.5 gap-1 text-[10px] md:px-2 md:py-0.5 md:text-xs whitespace-nowrap"
            >
              <IconTrendingUp />
              34 New  
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            12 Unanswered <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
          Click here to view more!
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Systems Programming</CardDescription>
          <CardTitle className="text-xl md:text-2xl font-semibold tabular-nums">
           COMP2017
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="px-1.5 py-0.5 gap-1 text-[10px] md:px-2 md:py-0.5 md:text-xs whitespace-nowrap"
            >
              <IconTrendingDown />
             27 New
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
           10 Unanswered. <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
           Click here to view more!
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Discrete Mathematics</CardDescription>
          <CardTitle className="text-xl md:text-2xl font-semibold tabular-nums">
            MATH2069
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="px-1.5 py-0.5 gap-1 text-[10px] md:px-2 md:py-0.5 md:text-xs whitespace-nowrap"
            >
              <IconTrendingUp />
              2 New  
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            1 Unanswered <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground"> Click here to view more.</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Interdisciplinary Engineering</CardDescription>
          <CardTitle className="text-xl md:text-2xl font-semibold tabular-nums">
            ENGG3112
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="px-1.5 py-0.5 gap-1 text-[10px] md:px-2 md:py-0.5 md:text-xs whitespace-nowrap"
            >
              <IconTrendingUp />
             43 New  
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
           27 Unanswered <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Click here to view more.</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>ISYS2110</CardDescription>
          <CardTitle className="text-xl md:text-2xl font-semibold tabular-nums">
            Web and Information Designs
          </CardTitle>
          <CardAction>
            <Badge
              variant="outline"
              className="px-1.5 py-0.5 gap-1 text-[10px] md:px-2 md:py-0.5 md:text-xs whitespace-nowrap"
            >
              <IconTrendingUp />
             10 New  
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            3 Unanwered <IconTrendingUp className="size-4" />
          </div>
          
        </CardFooter>
      </Card>
    </div>
  )
}
