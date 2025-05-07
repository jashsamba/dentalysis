"use client";

import React, { useState, useEffect } from "react";
import { Box, Flex, useColorModeValue, Avatar, Button, Tooltip, IconButton } from "@chakra-ui/react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FileText, FolderKanban, LogOut, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { supaBrowser } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";

// Placeholder NavItem component (adapt based on actual implementation if different)
const NavItem = ({ icon: Icon, label, href, isCollapsed }: { icon: React.ElementType; label: string; href: string; isCollapsed: boolean }) => {
  const textColor = "gray.100"; // Use a slightly off-white for better feel
  return (
    <Tooltip label={isCollapsed ? label : undefined} placement="right">
      <Button
        as="a"
        href={href}
        variant="ghost"
        justifyContent={isCollapsed ? "center" : "flex-start"}
        w="full"
        p={isCollapsed ? 2 : 4} // Adjust padding when collapsed
        aria-label={label}
        color={textColor} // Apply text color to button
        _hover={{ bg: "whiteAlpha.200", color: "white" }} // Ensure hover state has contrast
      >
        <Icon size={20} />
        {!isCollapsed && <Box as="span" ml={3}>{label}</Box>}
      </Button>
    </Tooltip>
  );
};

interface LayoutClientStructureProps {
  children: React.ReactNode;
  user: User | null;
}

export default function LayoutClientStructure({ children, user: initialUser }: LayoutClientStructureProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [authUser, setAuthUser] = useState<User | null>(initialUser ?? null);

  const sidebarBg = "gray.900";
  const headerBorder = useColorModeValue("gray.200", "gray.700");
  const bodyBg = useColorModeValue("white", "gray.950");

  useEffect(() => {
    const supabase = supaBrowser();
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setAuthUser(user);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
       setAuthUser(session?.user ?? null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <Flex h="100vh" bg={bodyBg}>
      {/* Sidebar - Render conditionally based on authUser */}
      {authUser && (
          <Flex
            as="aside"
            direction="column"
            w={isCollapsed ? 20 : 64} 
            bg={sidebarBg}
            p={4}
            transition="width 0.2s"
          >
            <Box mb={8} textAlign={isCollapsed ? "center" : "left"}>
                <Box fontSize="2xl" fontWeight="bold" color="white">
                    {isCollapsed ? "D" : "Dentalysis"}
                </Box>
            </Box>
            <Flex direction="column" gap={2} flexGrow={1}>
                <NavItem href="/dashboard" icon={FolderKanban} label="Dashboard" isCollapsed={isCollapsed} />
                <NavItem href="/chat" icon={FileText} label="Chat" isCollapsed={isCollapsed} />
                <NavItem href="/finance" icon={FileText} label="Finance" isCollapsed={isCollapsed} />
            </Flex>
            <Box mt="auto">
                <IconButton
                    aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                    icon={isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    variant="ghost"
                    color="gray.200"
                    _hover={{ bg: "whiteAlpha.200", color: "white" }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    mb={2}
                    w="full"
                    justifyContent="center"
                />
                <NavItem href="/settings" icon={Settings} label="Settings" isCollapsed={isCollapsed} />
            </Box>
        </Flex>
       )}

      {/* Main Content Area - Adjust margin based on authUser and isCollapsed */} 
      <Flex direction="column" flex={1} ml={authUser ? (isCollapsed ? 20 : 64) : 0} transition="margin-left 0.2s">
        {/* Header */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          h={16}
          px={6}
          borderBottomWidth="1px"
          borderColor={headerBorder} // Use the hook value
        >
          {/* Add Header Content - Search, Notifications etc. */}
          <Box>
             {/* Placeholder for search or breadcrumbs */}
          </Box>
          <Flex align="center" gap={4}>
            <ThemeToggle />
            {authUser ? (
              <Tooltip label={authUser.email}>
                 <Avatar name={authUser.email || 'U'} size="sm" /> 
              </Tooltip>
            ) : (
              <Button as="a" href="/auth" size="sm">Sign In</Button>
            )}
             {/* Logout Button */}
             {authUser && (
               <form action="/auth/signout" method="post">
                 <Tooltip label="Sign Out">
                   <IconButton
                     aria-label="Sign Out"
                     icon={<LogOut size={18} />}
                     type="submit"
                     variant="ghost"
                     size="sm"
                   />
                 </Tooltip>
               </form>
             )}
          </Flex>
        </Flex>

        {/* Page Content - Constrain width and center */}
        <Box 
           as="main" 
           flex={1} 
           p={6} 
           overflowY="auto" 
           maxW="container.xl" // Max width (adjust as needed: lg, xl, 2xl, etc.)
           mx="auto" // Center horizontally
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
} 